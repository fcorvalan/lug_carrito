import { Router, Request, Response, response, request } from "express";
import carrito from "../model/carrito";
import carritoModel from '../model/carrito'
import itemModel from '../model/item'
import item from "./item";



const router = Router()

export default 
{
    test: async ( req:Request, res:Response) => 
    {
            res.statusCode = 200
            res.send('API TEST carrito -> OK')
    },
    
    traerCarrito: async (req:Request, res:Response) => 
    {
        var mongoose = require('mongoose');
        const id = req.params.id
        const carritousuario = await carritoModel.findById(id)
        console.log(id)
        console.log(carritousuario?.id)
        //////////////////
        let arr: string[] = []
        let total: number = 0
        ////////////////
        if (id && carritousuario)
        {
            for (let index = 0; index < carritousuario.productos.length; index++) 
            {
                const idproduc = carritousuario.productos[index];
                const producto = await itemModel.findById(idproduc)
                const nombreproducto = producto?.nombre
                const precioproducto = producto?.precio
                const marcaproducto = producto?.marca
                const codebarproducto = producto?.codebar
                if (nombreproducto && precioproducto)
                {
                    arr.push("MARCA: " + marcaproducto + "  MODELO: " + nombreproducto + "  PLU: " +codebarproducto + "  PRECIO: "+precioproducto.toString())
                    total = total + precioproducto
                }
                
            }
            //arr.sort()
            res.statusCode = 200
            res.send({arr,total})

        }
        else
        {
            res.send("El carrito no existe")
        }
       



    },
    crearCarrito: async (req:Request, res:Response) =>
    {
        console.log("creando carrito")
        var mongoose = require('mongoose')
        const striduser = req.params.id
        const iduser = mongoose.Types.ObjectId(striduser)
        console.log(iduser)
        
        try
        {
            console.log(striduser)
            const buscocarrito = await carritoModel.find({iduser: striduser})
            console.log(buscocarrito)
            
            if(buscocarrito.length !== 0)
            {
                res.status(400)
                res.send("El carrito ya existe. ID:" + buscocarrito[0].id )
                
            }
            else
            {
                const nuevocarrito = new carritoModel()
                nuevocarrito.iduser = iduser
                nuevocarrito.productos = []
                nuevocarrito.save()
                res.status(200)
                res.send("Carrito creado con exito - ID:" + nuevocarrito.id)
            }
        }
        catch
        {
            res.send("rompió flaco")
        }
            
    },
    eliminarCarrito: async (req:Request, res:Response) =>
    {
        const id = req.params.id
        await carritoModel.findByIdAndDelete(id)
        res.send("Carrito eliminado")
    },

    actualizarCarrito: async (req:Request, res:Response) =>
    {
        console.log("put")
        //recibe id de carrito, array productos, booleano
        var mongoose = require('mongoose')
        const productos = await itemModel.find()
        const carry = await carritoModel.findById(req.body.id)
        
        if(carry)
        {
            console.log("if agregar producto")
            console.log("carry" + carry + "matriz" + productos + " bool "+ req.body.addBool + " cantidad prod" + req.body.productos.length) // para debug


            if((req.body.addBool == true) && (req.body.productos.length>0))
            {
                console.log("bool true con productos")//para debug circuito
                for (let index = 0; index < req.body.productos.length; index++) {
                    carry.productos.push(req.body.productos[index])
                    
                }
                await carry.save()
                res.statusCode = 200
                res.send("Productos sumados al carrito")
            }
            else if((req.body.addBool == false) && (req.body.productos.length>0))
            {

                for (let index = 0; index < req.body.productos.length; index++) {
                    //carry.productos.push(req.body.productos[index])
                    const indexxof = carry.productos.indexOf(req.body.productos[index])
                    const exist = indexxof + 1
                    if(exist)
                    {
                        carry.productos.splice(indexxof,1)
                        //console.log ("indice: " + indexxof + "Producto " + carry.productos.indexOf(indexxof))
                        await carry.save()
                        res.send("Productos restados del carrito")
                    }
                    else
                    {
                        console.log("No existia este producto en el carrito:" + req.body.productos[index])
                        await carry.save()
                        res.send("No existia este producto en el carrito")
                    }
                }
                
                
            }
            else {res.send("No hay nada para editar")}
            
        }
        else
        {
            res.send('error: El Carrito no existe')
        }
        
    }

}