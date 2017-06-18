import { Router } /**/ from 'express';
import jwt /*       */ from 'jsonwebtoken';
import ctrl /*      */ from './index.ctrl';
import passport /*  */ from '../../passport';
import config /*    */ from '../../config';

const router = new Router();

/*          GET          */

router.get('/', ctrl.getIndex);
//
router.get('/login', ctrl.getLogin);
//
router.get('/login/facebook', /*
         */ passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
         //
router.get('/login/facebook/return', /*
        */ passport.authenticate('facebook', { failureRedirect: '/login', session: false }), // 1차 미들웨어
          (req, res) => { // 2차 미들웨어
            const expiresIn = 60 * 60 * 24 * 180; // 180 days
            const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
            res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
            res.redirect('/');
          });

/*          POST         */
/*          PUT          */
/*          DELETE       */
/*
  getIndex,
  getLogin,
  getFacebookLogin,
  getFacebookLoginCb,
*/
