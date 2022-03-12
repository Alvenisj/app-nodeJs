import routerx from 'express-promise-router';
import userController from '../controllers/controller-usuario';
import {check} from 'express-validator';
import valid from '../middlewares/middleware-validCampos';
import auth from '../middlewares/auth';



const app = routerx();

//POST

app.post('/add',[
check('nombre', '¡El nombre es obligatorio!').not().isEmpty(),
check('email', '¡El correo no es valido!').isEmail(),
check('Password', 'El password debe tener más de 5 caracteres').isLength({min:5, max: 16}),
valid.validCampos,
auth.verifyUserAdmin,
], userController.add);

app.post('/login', auth.verifyUserAdmin, userController.login);

//GET

app.get('/query', auth.verifyUserAdmin, userController.query);
app.get('/list', auth.verifyUserAdmin, userController.list);


//PUT

app.put('/update', auth.verifyUserAdmin, userController.update);
app.put('/activate', auth.verifyUserAdmin, userController.activate);
app.put('/desactivate', auth.verifyUserAdmin, userController.desactivate);

//DELETE

app.delete('/remove', auth.verifyUserAdmin, userController.remove);




export default app;