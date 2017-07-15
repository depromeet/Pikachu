/* eslint-disable global-require */
import authRouter from './auth';
import indexRouter from './index';
import meetRouter from './meet';

export default {
  auth: authRouter,
  index: indexRouter,
  meet: meetRouter,
};

