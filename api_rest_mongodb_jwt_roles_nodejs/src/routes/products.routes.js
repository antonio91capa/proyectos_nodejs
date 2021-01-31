import { Router } from 'express'

import * as productsCtrl from '../controllers/products.controller'
import { authMiddleware } from '../middleware'

const router = Router()

router.get('/', productsCtrl.getProducts)
router.post('/', [authMiddleware.verifyToken, authMiddleware.isModerator], productsCtrl.createProduct)
router.get('/:productId', productsCtrl.getProductById)
router.put('/:productId', [authMiddleware.verifyToken, authMiddleware.isModerator], productsCtrl.updateProduct)
router.delete('/:productId', [authMiddleware.verifyToken, authMiddleware.isModerator], productsCtrl.deleteProduct)

export default router;