import { Router, Request, Response, query } from "express";
import { ObjectId } from "mongoose";
import usuarioModel from '../model/usuario'


const router = Router()

export default 
{
    test: async ( req:Request, res:Response) => 
    {
            res.statusCode = 200
            res.send('API TEST Usuario -> OK')
    },
    
    traerUsuario: async (req:Request, res:Response) => 
    {
        const id = req.params.id //12312451245
        if(!id) //!= null != ""
        {
            res.statusCode = 404
            res.send("no se pudo traer el usuario")
        }
        else
        {
            const usuario = await usuarioModel.findById(id)
            res.status(200).send(usuario)
            console.log(usuario)
            console.log(id)
        }
        
    },
    crearUsuario: async (req:Request, res:Response) =>
    {
        // const {items } = req.body
        // const carrito = new carritoModel()
        // let arrCarrito: carritoModel[] = carrito
        console.log(req.body)
        if(req.body == "")
        {
            await null
            res.statusCode = 404
            res.send("no se pudo crear")
            
        }
        else
        {
            const nuevousuario = new usuarioModel(
                {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    dni: req.body.dni,
                    usuario: req.body.usuario,
                    contrasena: req.body.contrasena
                }
            )
            
            await nuevousuario.save()
            req.statusCode = 200
            console.log(nuevousuario)
            res.send("Usuario Creado")
        }
            

        
        
    },
    eliminarUsuario: async (req:Request, res:Response) =>
    {
        
        const id = req.params.id
        await usuarioModel.findByIdAndDelete(id)
        res.send("Usuario eliminado")

    },
    actualizarUsuario: async (req:Request, res:Response) =>
    {
        console.log(req.body)
        if(req.body == "")
        {
            res.statusCode = 404
            res.send("no se pudo crear")
            
        }
        else
        {
            await usuarioModel.findByIdAndUpdate(req.body.id, 
                {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    dni: req.body.dni,
                    usuario: req.body.usuario,
                    contrasena: req.body.contrasena
                })
            
            req.statusCode = 200
            res.send("se actualizo")
            console.log("Se actualizo")
        }
    }

}