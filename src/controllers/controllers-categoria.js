import models from '../models/models-control';  



let add = async (req, res, next) => {
    //se realiza una destructruración del contenido que se recibe del body
 const { nombre, descripcion } = req.body;


    try {

        const data = await models.categoria.create({
            nombre, 
            descripcion
        })

        res.status(200).json(data);
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }

}

let query = async (req, res, next) => {
     let id = req.query._id;
    try {
        const data = await models.categoria.findOne({_id:id})
        if (!data) {
            res.status(404).send({
                message: "¡Error, el archivo no existe!"
            })
            
        } else {
            res.status(200).json(data)
        }

        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let list = async (req, res, next) => {
    let valor = req.query.valor;

    try {
        const data = await models.categoria.find({
            $or:[{'nombre': new RegExp( valor, 'i')},
                 {'descripcion': new RegExp( valor, 'i')}]
        
        }, {createAt:0})
        .sort({'createAt':-1});
        res.status(200).json(data);
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let update = async (req, res, next) => {
    let id = req.body._id;
    const { nombre, descripcion} = req.body;


    try {
        const data = await models.categoria.findByIdAndUpdate({_id:id}, {nombre, descripcion})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let remove = async (req, res, next) => {
    let id = req.body._id;

    try {
        const data = await models.categoria.findByIdAndDelete({_id: id})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let activate = async (req, res, next) => {
    let id = req.body._id;

    try {

        const data = await models.categoria.findByIdAndUpdate({_id:id}, {estado:1})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let desactivate = async (req, res, next) => {
    let id = req.body._id;

    try {

        const data = await models.categoria.findByIdAndUpdate({_id:id}, {estado:0})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}




export default {

    add, query, list, update,
    remove, activate, desactivate

}