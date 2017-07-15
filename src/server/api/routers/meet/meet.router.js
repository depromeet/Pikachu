import { Router } from 'express';
import ctrl from './meet.ctrl';

const router = new Router();

router.get('/', ctrl.getOpenMeetList);

export default router;
