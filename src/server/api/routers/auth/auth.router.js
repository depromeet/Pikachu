import { Router } /**/ from 'express';
import passport /*  */ from 'passport';
import jwt /*       */ from 'jsonwebtoken';

import passportConf from '../../../middlewares/passport';
import config from '../../../config';

const router = new Router();

router.get('/test', passportConf.isAuthenticated, passportConf.isAuthorized, (req, res) => {
  console.info(req.user);
  res.send('dasf');
});

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
);

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect(req.session.returnTo || '/');
}); // 2차 미들웨어

router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  res.redirect(req.session.returnTo || '/');
});
export default router;
