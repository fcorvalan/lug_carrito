import {model, Schema} from 'mongoose'
const usuarioSchema = new Schema(
{
    nombre: String,
    apellido: String,
    dni: String,
    usuario: String,
    contrasena: String
})

export default model('Users', usuarioSchema)