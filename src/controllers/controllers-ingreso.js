import models from '../models/models-control';
import controller from '../controllers/controllers-stock';



//verbo post
let add = async (req, res, next) => {
    
    const {usuario, persona, tipo_comprobante, serie_comprobante,
         impuesto, total, detalle} = req.body;

    try {
       
        const data = await models.ingreso.create({

            usuario,
            persona,
            tipo_comprobante,
            serie_comprobante,
            impuesto,
            total,
            detalle

        })
        let detalles = req.body.detalle;
        detalles.map(function(x){

            controller.disminStock(x._id, x.cantidad)
        })

        res.status(200).json(data)

    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e);
        
    }

}


let query = async (req, res, next) => {
    let id = req.query._id;

    try {

        const data = await models.ingreso.findOne({_id: id})
        .populate('usuario', {nombre:1})
        .populate('persona', {persona:1})

        if (!data) {
            res.status(404).send({
                message: "¡¡Error el registro no existe!!"
            })
            
        } else {

            res.status(200).json(data);
            
        }
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }

}


let list = async (req, res, next) => {
    let valor = req.query.valor;

    try {

        const data = await models.ingreso.find({
           
            $or:[{'serie_comprobante': new RegExp(valor, 'i')}]
        
        })
        
        .populate('usuario', {nombre:1})
        .populate('persona', {persona:1})
        .sort({'createAt':-1})
         res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e);
        
    }


}

let activate = async (req, res, next) => {
    const id = req.body._id;

    try {

        const data = await models.ingreso.findByIdAndUpdate({_id: id}, {estado:1})
        let detalles = data.detalle;
        detalles.map(function (x){
            controller.aumentStock(x._id, x.cantidad)
        })

        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        next();
        
    }


}

let desactivate = async (req, res, next) => {
    const id = req.body._id;

    try {

        const data = await models.ingreso.findByIdAndUpdate({_id: id}, {estado:0})
        let detalles = data.detalle;
        detalles.map(function(x){
            controller.disminStock(x._id, x.cantidad)
        })
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }


}

let grafAnual = async (req, res, next) => {

try {

    const data = await models.ingreso.aggregate([
        {
         $group:{
         _id: {
               month: {$month: '$createAt'},
                year: {$year: '$createAt'}
                   
            },
                total: {$sum: '$total'},
                numero: {$sum:1}
                 }
        }, {

            $sort:{
                "_id.year": -1,
                "_id.month": -1
            }
        }

    ]).limit(12)
    res.status(200).json(data)
    
} catch (e) {

    res.status(500).send({

        message: "ERROR EN EL PROCESO"
    })

    next(e);
    
}

}


let consultFecha = async (req, res, next) => {
    let {valor, end} = req.query;

    try {

        const data = await models.ingreso.find({

            'createAt': {"$gte": valor, "$lista": end}
        })
        .populate('usuario', {nombre:1})
        .populate('persona', {nombre:1})
        .sort({'createAt':-1})
        res.status(200).json(data)   
    } catch (e) {

        res.status(500).send({


            message: "Error en el proceso"
        })


        next(e)

    }

}





export default {

    add,
    query,
    list,
    activate,
    desactivate,
    grafAnual,
    consultFecha


}