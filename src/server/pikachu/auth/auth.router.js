import { Router } /**/ from 'express';
import passport /*  */ from '../../passport';

const router = new Router();

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/facebook/callback', /*
         */ passport.authenticate('facebook', { failureRedirect: '/login' }), /* 1차 미들 웨어
         */ (req, res) => res.redirect(req.session.returnTo || '/')); // 2차 미들웨어
