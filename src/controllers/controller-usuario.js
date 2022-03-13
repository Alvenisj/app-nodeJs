import models from '../models/models-control';  
import helpers from './controllers-helpers';
import token from '../services/services-token';



let add = async (req, res, next) => {
    const {rol, nombre, tipo_documento, num_documento, direccion, telefono, email, Password} = req.body;
    const password = await helpers.encryptPassword(Password);

    try {
        const data = await models.usuario.create({
            rol,
            nombre, 
            tipo_documento,
            num_documento,
            direccion, 
            telefono,
            email,
            password

        })

        console.log(data);
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
      
        const data = await models.usuario.findOne({_id: id})
        if (!data) {
            res.status(404).send({

                message: "¡¡Error, El archivo no existe!!"
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

        const data = await models.usuario.find({

            $or:[{'nombre': new RegExp(valor, 'i')},
                 {'email': new RegExp(valor, 'i')}]
        }, {createAt:0})
        .sort({'createAt':-1});
        res.status(200).json(data)
      
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let update = async (req, res, next) => {
    let id = req.body._id;
    const {rol, nombre, tipo_documento, num_documento, direccion, telefono, email, Password, estado} = req.body;
    const sql = await models.usuario.findOne({_id: id});
    const password = ''

    try {
        if (Password != sql.Password) {
            Password = await helpers.encryptPassword(Password);

            
        }  else {

            Password = Password;
            
        }

        const data =  await models.usuario.findByIdAndUpdate({_id: id}, {

        rol,
        nombre,
        tipo_documento,
        num_documento,
        direccion,
        telefono, 
        email, 
        password,
        estado

        })
        res.status(200).json(data);
        
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let remove = async (req, res, next) => {
    const id = req.body._id;
   

    try {

        const data = await models.usuario.findByIdAndDelete({_id:id})
        res.status(200).json(data);

    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let activate = async (req, res, next) => {
   const id = req.body._id;

    try {       

       const data = await models.usuario.findByIdAndUpdate({_id: id}, {estado:1})     
       res.status(200).json(data)
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}

let desactivate = async (req, res, next) => {
    const id = req.body._id;

    try {

          const data = await models.usuario.findByIdAndUpdate({_id: id}, {estado:0})     
          res.status(200).json(data)
    } catch (e) {

        res.status(500).send({
            message: "ERROR EN EL PROCESO"
        })

        next(e)
        
    }


}


let login = async (req, res, next) => {

    const { email, Password } = req.body;
    try {
       let user = await models.usuario.findOne({email: email, estado:1})
       if (user) {
            let match = await helpers.matchPassword(Password, user.Password);  
            if (match) {

            let tokenReturn = await token.encode(user._id);
            res.status(200).json(user, tokenReturn)
            
        } else {

            res.status(404).send({

                message: "Error en el proceso"
            })

        }

     } else {

        res.status(404).send({

            message: "El usuario no existe"
        })
     }
        
    } catch (e) {

        res.status(500).send({

            message: "Error en el registro de usuario"
        })
        
    }

}



export default {

    add,
    query,
    list, 
    update,
    remove,
    activate,
    desactivate,
    login

}