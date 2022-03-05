import { Schema, model } from 'mongoose';

const ArticuloSchema = new Schema({

    categoria:     {type:Schema.ObjectId, ref:'categoriaSchema'},
    codigo:        {type:String, maxlength:60, unique:true, required:true},
    nombre:        {type:String, maxlength:60, unique:true, required:true},
    descripcion:   {type:String, maxlength:255, required:true},
    precio_venta:  {type:String, required:true},
    stock:         {type:String, required:true},
    estado:        {type:Number, default:1},
    createAt:      {type:Date, default: Date.now}


})


const Articulo = model('articuloSchema', ArticuloSchema);
export default Articulo;