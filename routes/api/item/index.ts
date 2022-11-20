import {Router, Request, Response } from 'express'
import itemCtrl from '../../../controller/item'

const router = Router()
router.get('/test', itemCtrl.traerItems)
router.get('/:id', itemCtrl.traerItems)
router.post('/', itemCtrl.crearItem)
router.put('/', itemCtrl.actualizarItem)
router.delete('/:id', itemCtrl.eliminarItem)
export default router



