import { Router } /**/ from 'express';
import passport /*  */ from 'passport';
import jwt /*       */ from 'jsonwebtoken';

import passportConf from '../../common/passport';
import config from '../../config';

const router = new Router();

router.get('/test', passportConf.isAuthenticated, passportConf.isAuthorized, (req, res) => {
  console.info(req.user);
  res.send('dasf');
});

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'], session: false }),
);

router.get('/facebook/callback', /*
         */ passport.authenticate('facebook', { failureRedirect: '/login', session: false }), /* 1차 미들 웨어
         */ (req, res) => {
           const expiresIn = 60 * 60 * 24 * 180; // 180 days
           console.info('sadfadsfadf');
           console.info(req.user);
           const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
           console.info('token info');
           console.info(token);
           res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
           res.redirect(req.query.returnTo || '/');
         }); // 2차 미들웨어

export default router;
