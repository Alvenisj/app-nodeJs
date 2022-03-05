import models from '../models/models-control';


//verbo post
let add = async (req, res, next) => {
    
    const {tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email} = req.body;

    try {
        const data = await models.persona.create({

            tipo_persona,
            nombre,
            tipo_documento,
            num_documento,
            direccion,
            telefono, 
            email

        })

        res.status(200).json(data)

    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }

}


let query = async (req, res, next) => {
    let id = req.query._id;

    try {

        const data = await models.persona.findOne({_id: id});
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

        const data = await models.persona.find({
            $or:[{'nombre': new RegExp(valor, 'i')},
                 {'email': new RegExp(valor, 'i')}]
        
        }, {createAt:0})
        .sort({'createAt':-1});
        res.status(200).json(data);
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }


}


let listClientes = async (req, res, next) => {
    let valor = req.query.valor;

    try {

        const data = await models.persona.find({
            $or:[{'nombre': new RegExp(valor, 'i')},
                 {'email': new RegExp(valor, 'i')}],
                 'tipo_persona':'clientes'
        
        }, {createAt:0})
        .sort({'createAt':-1});
        res.status(200).json(data);
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();

       
        
    }


}



let listProveedores = async (req, res, next) => {
    let valor = req.query.valor;

    try {

        const data = await models.persona.find({
            $or:[{'nombre': new RegExp(valor, 'i')},
                 {'email': new RegExp(valor, 'i')}],
                 'tipo_persona':'proveedores'
        
        }, {createAt:0})
        .sort({'createAt':-1});
        res.status(200).json(data);
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }


}

let update = async (req, res, next) => {
    const id = req.body._id;
    const {tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email} = req.body;

    try {

        const data = await models.persona.findByIdAndUpdate({_id: id}, {
            
            tipo_persona,
            nombre,
            tipo_documento,
            num_documento, 
            direccion,
            telefono,
            email
        })
        res.status(200).json(data)
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }


}

let remove = async (req, res, next) => {
    const id = req.body._id;

    try {

        const data = await models.persona.findByIdAndDelete({_id: id})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }


}


let activate = async (req, res, next) => {
    const id = req.body._id;

    try {

        const data = await models.persona.findOneAndUpdate({_id: id}, {estado:1})
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

        const data = await models.persona.findOneAndUpdate({_id: id}, {estado:0})
        res.status(200).json(data)
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next();
        
    }


}

export default {

    add,
    query,
    list,
    listClientes, 
    listProveedores,
    update,
    remove,
    activate,
    desactivate

}