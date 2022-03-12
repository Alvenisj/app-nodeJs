import routerx from 'express-promise-router';
import ingresoController from '../controllers/controllers-ingreso';
import auth from '../middlewares/auth';

const app = routerx();


//POST

app.post('/add', auth.verifyUserAlmacenero, ingresoController.add);

//GET

app.get('/query', auth.verifyUserAlmacenero, ingresoController.query);
app.get('/list', auth.verifyUserAlmacenero, ingresoController.list);
app.get('/grafanual', auth.verifyUser, ingresoController.grafAnual);
app.get('/consultFecha', auth.verifyUser, ingresoController.consultFecha);


//PUT


app.put('/activate', auth.verifyUserAlmacenero, ingresoController.activate);
app.put('/desactivate', auth.verifyUserAlmacenero, ingresoController.desactivate);




export default app;