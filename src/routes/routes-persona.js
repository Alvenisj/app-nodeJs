import routerx from 'express-promise-router';
import personaController from '../controllers/controllers-persona';
import auth from '../middlewares/auth';


const app = routerx();


//POST

app.post('/add', auth.verifyUser,  personaController.add);

//GET

app.get('/query', auth.verifyUser, personaController.query );
app.get('/list', auth.verifyUser,  personaController.list);
app.get('/listCliente', auth.verifyUser,  personaController.listCliente);
app.get('/listProveedor', auth.verifyUser, personaController.listProveedor);


//PUT

app.put('/update', auth.verifyUser, personaController.update);
app.put('/activate', auth.verifyUser, personaController.activate);
app.put('/desactivate', auth.verifyUser, personaController.desactivate);

//DELETE

app.delete('/remove', auth.verifyUser, personaController.remove);




export default app;