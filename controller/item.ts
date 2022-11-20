import { Router, Request, Response } from "express";
import item from "../model/item";
import itemModel from '../model/item'


const router = Router()

export default 
{
    test: async ( req:Request, res:Response) => 
    {
            res.statusCode = 200
            res.send('API TEST ITEM -> OK')
    },
    

    traerItems: async (req:Request, res:Response) => 
    {
        
            const items = await itemModel.find({})
            res.send(items)
        
    },
    crearItem: async (req:Request, res:Response) =>
    {
        console.log(req.body)
        if(req.body == "")
        {
            await null
            res.statusCode = 404
            res.send("no se pudo crear")
            
        }
        else
        {
            const nuevoprod = new itemModel(
                {
                    marca: req.body.marca,
                    nombre: req.body.nombre,
                    codebar: req.body.codebar,
                    precio: req.body.precio
                }
            )
            
            await nuevoprod.save()
            req.statusCode = 200
            console.log(nuevoprod)
            res.send("Producto Creado")
        }
        
    },
    eliminarItem: async (req:Request, res:Response) =>
    {
        const id = req.params.id
        await itemModel.findByIdAndDelete(id)
        res.send("producto eliminado")
    },
    actualizarItem: async (req:Request, res:Response) =>
    {
        console.log(req.body)
        if(req.body == "")
        {
            
            res.statusCode = 404
            res.send("no se pudo crear")
            
        }
        else
        {
            
            await itemModel.findByIdAndUpdate(req.body.id, 
                {
                    marca: req.body.marca,
                    nombre: req.body.nombre,
                    codebar: req.body.codebar,
                    precio: req.body.precio
                })
                
            req.statusCode = 200
            console.log("Se actualizo")
            res.send("se actualizo")
        }
    
    }

}