//models-control es el archivo que gestiona las rutas
import models from '../models/models-control'


//verbo post
let add = async (req, res, next) => {
    const {categoria, codigo, nombre, descripcion, precio_venta, stock} = req.body;

    try {
        const data = await models.Articulo.create({

            categoria,
            codigo,
            nombre, 
            descripcion, 
            precio_venta,
            stock

        })

        res.status(200).json(data)

    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }

}

//este requerimiento se hace a través de la consulta de un documento
let query = async (req, res, next) => {
    let id = req.query._id;

    try {

        const data = await models.Articulo.findOne({_id:id})
        //con el método populate se ordena los datos que se obtiene en la constante data
        .populate('categoria',{nombre:1}) //nombre:1 significa que ordena de manera ascendente
        if (!data) {
            res.status(404).send({
                message: "¡¡Error el archivo no existe!!"
            })
            
        } else {

            res.status(200).json(data)
            
        }
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }


}


let queryCode = async (req, res, next) => {
    let code = req.query.codigo;

    try {
       const data = await models.Articulo.findOne({codigo: code})
        //con el método populate se ordena los datos que se obtiene en la constante data
        .populate('categoria',{nombre:1}) //nombre:1 significa que ordena de manera ascendente
        if (!data) {
            res.status(404).send({
                message: "¡¡Error el archivo no existe!!"
             })
            
        } else {

            res.status(200).json(data)
            
        }
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }


}

let list = async (req, res, next) => {
    const valor = req.query.valor;

    try {

        const data = await models.Articulo.find({
            $or:[{'nombre': new RegExp( valor, 'i')},
                 {'descripcion': new RegExp( valor, 'i')}]
        
        }, {createAt:0})
        .sort({'createAt':-1});
        res.status(200).json(data);
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }


}

let update = async (req, res, next) => {
    const id = req.body._id;
    const {codigo, nombre, descripcion, precio_venta, stock} = req.body;

    try {

        const data = await models.Articulo.findById({_id:id}, {
            codigo, 
            nombre,
            descripcion,
            precio_venta,
            stock
        })
        res.status(200).json(data)
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }


}

let remove = async (req, res, next) => {
    const id = req.body._id;

    try {

        const data = await models.Articulo.findByIdAndDelete({_id: id})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }


}

let activate = async (req, res, next) => {
    const id = req.body._id;

    try {

        const data = await models.Articulo.findByIdAndUpdate({_id: id}, {estado:1})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }


}

let desactivate = async (req, res, next) => {
    const id = req.body._id;

    try {

        const data = await models.Articulo.findByIdAndUpdate({_id: id}, {estado:0})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })
        
    }


}




export default {

    add, query, queryCode, list, update,
    remove, activate, desactivate

}