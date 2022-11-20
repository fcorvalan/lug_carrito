import { Router, Request,Response } from 'express';
import carritoRouter from './carrito'
import itemRouter from './item'
import usuarioRouter from './usuario'

const router = Router();

router.use('/carrito',carritoRouter)        //localhost:mipuerto/api/carrito
router.use('/item', itemRouter)             //localhost:mipuerto/api/item
router.use('/usuario', usuarioRouter)       //localhost:mipuerto/api/usuario

export default router;