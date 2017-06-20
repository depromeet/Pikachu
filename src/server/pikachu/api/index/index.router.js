import { Router } /**/ from 'express';
import ctrl /*      */ from './index.ctrl';

const router = new Router();

router.post('/login', ctrl.postLogin);
router.post('/signup', ctrl.postSignUp);

export default router;
