import {Schema, model} from 'mongoose'


const IngresoSchema = new Schema({

    usuario:           {type: Schema.ObjectId, ref: 'usuarioSchema', required:true},
    persona:           {type: Schema.ObjectId, ref: 'personaSchema', required:true},
    tipo_comprobante:  {type:String, maxlength:30, required:true},
    serie_comprobante: {type:String, maxlength:30, required:true},
    impuesto:          {type:Number, maxlength:30, required:true},
    total:             {type:Number, maxlength:30, required:true},
    detalle: [{
        _id:      {type:String, required:true},
        articulo: {type:String, required:true},
        cantidad: {type:Number, required:true},
        precio:   {type:Number, required:true},
    }],         
    estado:       {type:Number, default:1},
    createAt:     {type:Date, default:Date.now}



})

const ingreso = model('ingresoSchema',IngresoSchema );


export default ingreso;