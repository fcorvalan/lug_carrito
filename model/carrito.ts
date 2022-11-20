import {model, Schema} from 'mongoose'
const carritoSchema = new Schema({
    iduser: String,//{type: Schema.Types.ObjectId, ref: 'User'},
    productos: Array//[{type: Schema.Types.ObjectId, ref: 'Productos'}]
})

export default model('Carrito', carritoSchema)
