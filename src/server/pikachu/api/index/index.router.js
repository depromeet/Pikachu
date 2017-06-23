import { Router } /**/ from 'express';
import jwt /*       */ from 'jsonwebtoken';
import ctrl /*      */ from './index.ctrl';

const router = new Router();

router.post('/login', ctrl.postLogin, (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(req.result.user, 'secret', { expiresIn });
  req.result.token = token;
  res.send(req.result);
  // res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
  // res.redirect('/');
});

router.post('/signup', ctrl.postSignUp);

export default router;
