import { Router } from 'express'
import LinkController from '../controllers/LinkController'

const router = Router()

router.get('/:id', LinkController.index)
router.get('/:id/status', LinkController.status)
router.post('/new', LinkController.store)

export default router
