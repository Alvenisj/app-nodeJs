import routerx from 'express-promise-router';
import personaController from '../controllers/controllers-persona';


const app = routerx();


//POST

app.post('/add', personaController.add);

//GET

app.get('/query',personaController.query );
app.get('/list', personaController.list);
app.get('/listClientes', personaController.listClientes);
app.get('/listProveedores',personaController.listProveedores);


//PUT

app.put('/update',personaController.update);
app.put('/activate',personaController.activate);
app.put('/desactivate',personaController.desactivate);

//DELETE

app.delete('/remove',personaController.remove);




export default app;