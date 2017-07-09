import { Router } /**/ from 'express';
import jwt /*       */ from 'jsonwebtoken';
import ctrl /*      */ from './index.ctrl';
import config from '../../../config';
import passportConf from '../../../middlewares/passport';

const router = new Router();

router.get('/test', passportConf.isAuthenticated, passportConf.isAuthorized, (req, res) => {
  console.info(req.user);
  res.send('dasf');
});

router.post('/login', ctrl.postLogin, (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(req.result.user, config.auth.jwt.secret, { expiresIn });
  // res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  // res.send(req.result);
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect(req.session.returnTo || '/');
});

router.post('/signup', ctrl.postSignUp);

export default router;
