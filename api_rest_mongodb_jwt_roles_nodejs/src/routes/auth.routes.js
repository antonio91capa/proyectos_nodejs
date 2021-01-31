import { Router } from 'express'

import * as authCtrl from "../controllers/auth.controller"
import { verifySignup } from '../middleware'

const router = Router()

router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRoleExists], authCtrl.signup())
router.post('/signin', authCtrl.signin())

export default router;