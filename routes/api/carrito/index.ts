import {Router, Request, Response } from 'express'
import carritoCtrl from '../../../controller/carrito'

const router = Router()
router.get('/test', carritoCtrl.test)
router.get('/:id', carritoCtrl.traerCarrito)
router.post('/:id', carritoCtrl.crearCarrito)
router.put('/', carritoCtrl.actualizarCarrito)
router.delete('/:id', carritoCtrl.eliminarCarrito)
export default router