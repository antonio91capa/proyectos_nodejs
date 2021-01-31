import { Router } from 'express'
import * as userCtrl from '../controller/user.controller'
import { authJwt, verifySignup } from '../middleware'

const router = Router()

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRoleExists], userCtrl.createUser)

export default router;