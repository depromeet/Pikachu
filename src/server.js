/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import expressValidator from 'express-validator';
import expressGraphQL from 'express-graphql';
import errorHandler from 'errorhandler';
// import jwt from 'jsonwebtoken';
import logger from 'morgan';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import flash from 'express-flash';

// import flash from 'express-flash';
import schema from './data/schema';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import models from './data/models';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
// import indexRouter from './server/api/routers/index';
// import authRouter from './server/api/routers/auth';
import r, { test } from './server/api/routers';
// 위에 두 문장을 어떻게 하면 하나로 합칠 수 있을까? router가 10개면 10줄의 소스가 생기니까... 고민..
import passConf from './server/middlewares/passport';
import config from './server/config';

const app = express();

console.info(test);

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

// global.modelRequire = (modelName) => {
//   console.info(modelNam
//   return global.require(`./server/database/models/${modelName}`);
// };
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sessionOption = {
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
};

if (process.env.NODE_ENV !== 'development') {
  const RedisStore = connectRedis(session);
  sessionOption.store = new RedisStore({
    host: config.redis.host,
    port: config.redis.port,
  });
}

app.use(session(sessionOption));

app.use(expressValidator());

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: config.auth.jwt.secret, // config.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));

// Error handler for express-jwt
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

app.use((req, res, next) => {
  if (!req.user && req.path !== '/login' && req.path !== '/signup' && req.path !== '/graphql'
      && !req.path.match(/^\/auth/)) {
    req.session.returnTo = req.path;
  } else if (req.user && req.path === '/account') {
    req.session.returnTo = req.path;
  }

  next();
});

if (__DEV__) {
  app.enable('trust proxy');
}

// app.use('/', indexRouter);
app.use('/auth', r.auth);
app.use('/api/', r.index); // 권한이 필요없는 경우
app.use('/sample', passConf.isAuthenticated, passConf.isAuthorized);
//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    const fetch = createFetch({ // fetch를 이용해서 서버에 요청을 보낼 수 있다 공통 url과 cookie값을 사용한다.
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
    });
    const initialState = { // 유저에 대한 정보를 같이 넘겨줌.
      user: req.user || null,
    };

    const store = configureStore(initialState, { // 기본적인 유저에 대한 정보와 유저가 요청을 보내기 위한 fetch 함수를 저장한다
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
    });

    store.dispatch(setRuntimeVariable({ // 실행 시간에 대한 정보를 담고 있는 state action
      name: 'initialNow',
      value: Date.now(),
    }));

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = { // 전역 변수로 css 관련된 것들과 fetch함수 store를 넘겨준다.
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      fetch,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) { // 특정한 경로로 들어왔을때 router.resolve가 redirect에 대한 정보를 리턴하면 해당 페이지로 리다이렉트함.
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context} store={store}>
        {route.component}
      </App>,
    );
    data.styles = [
      { id: 'css', cssText: [...css].join('') },
    ];
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

app.use(errorHandler());
//
// Launch the server
// -----------------------------------------------------------------------------
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
  });
});
