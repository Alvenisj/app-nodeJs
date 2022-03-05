import routerx from 'express-promise-router';
import userController from '../controllers/controller-usuario';
import {check} from 'express-validator';
import valid from '../middlewares/middleware-validCampos';



const app = routerx();

//POST

app.post('/add',[
check('nombre', '¡El nombre es obligatorio!').not().isEmpty(),
check('email', '¡El correo no es valido!').isEmail(),
check('Password', 'El password debe tener más de 5 caracteres').isLength({min:5, max: 16}),
valid.validCampos,
], userController.add);

app.post('/login', userController.login);

//GET

app.get('/query', userController.query);
app.get('/list', userController.list);


//PUT

app.put('/update', userController.update);
app.put('/activate', userController.activate);
app.put('/desactivate', userController.desactivate);

//DELETE

app.delete('/remove', userController.remove);




export default app;