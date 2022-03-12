import routerx from 'express-promise-router';
import ventaController from '../controllers/controllers-venta';
import auth from '../middlewares/auth';

const app = routerx();


//POST

app.post('/add', auth.verifyUserVendedor, ventaController.add);

//GET

app.get('/query', auth.verifyUserVendedor, ventaController.query);
app.get('/list', auth.verifyUserVendedor, ventaController.list);
app.get('/grafanual', auth.verifyUser, ventaController.grafAnual);
app.get('/consultFecha', auth.verifyUser, ventaController.consultFecha);


//PUT


app.put('/activate', auth.verifyUserVendedor, ventaController.activate);
app.put('/desactivate', auth.verifyUserVendedor, ventaController.desactivate);




export default app;