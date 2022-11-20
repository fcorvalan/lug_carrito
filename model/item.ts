import {model, Schema} from 'mongoose'
const productoSchema = new Schema(
{
    marca: String,
    nombre: String,
    codebar: String,
    precio: {type: Number,default:0}
})

export default model('Productos', productoSchema)
