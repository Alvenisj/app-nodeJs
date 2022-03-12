import tokenServer from '../services/services-token';


//DETERMINA SI EL USUARIO TIENE ACCESO TENIENDO EN CUENTA EL TIPO DE ROL

let verifyUser = async (req, res, next) => {

    if (!req.headers.token) {

        return res.status(404).send({

            message: "Error, no se tiene un Token - user"
        });
        
    }

    const resp = await tokenServer.decode(req.headers.token)

    if (resp.rol === 'Administrador' || res.rol === 'Vendedor' || res.rol === 'Almacenero' ) {
        next();        
    } else {

        return res.status(403).send({

            message: "Error sin Autorización"
        })
    }


}


//DETERMINA EL ACCESO DEL ADMINISTRADOR 

let verifyUserAdmin = async (req, res, next) => {

    if (!req.headers.token) {

        return res.status(404).send({

            message: "Error, no se tiene un Token - user"
        });
        
    }

    const resp = await tokenServer.decode(req.headers.token)

    if (resp.rol === 'Administrador') {
        next();        
    } else {

        return res.status(403).send({

            message: "Error sin Autorización"
        })
    }


}

//DETERMINA EL ACCESO DEL ADMINISTRADOR Y EL VENDEDOR

let verifyUserVendedor = async (req, res, next) => {

    if (!req.headers.token) {

        return res.status(404).send({

            message: "Error, no se tiene un Token - user"
        });
        
    }

    const resp = await tokenServer.decode(req.headers.token)

    if (resp.rol === 'Administrador' || res.rol === 'Vendedor') {
        next();        
    } else {

        return res.status(403).send({

            message: "Error sin Autorización"
        })
    }


}


//DETERMINA EL ACCESO DEL ADMINISTRADOR Y EL ALMACENERO
let verifyUserAlmacenero = async (req, res, next) => {

    if (!req.headers.token) {

        return res.status(404).send({

            message: "Error, no se tiene un Token - user"
        });
        
    }

    const resp = await tokenServer.decode(req.headers.token)

    if (resp.rol === 'Administrador' || res.rol === 'Almacenero' ) {
        next();        
    } else {

        return res.status(403).send({

            message: "Error sin Autorización"
        })
    }


}

export default {

    verifyUser,
    verifyUserAdmin,
    verifyUserVendedor,
    verifyUserAlmacenero


}