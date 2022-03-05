import routerx from 'express-promise-router';
import catController from '../controllers/controllers-categoria';

const app = routerx();

//POST

app.post('/add', catController.add);


//GET

app.get('/query', catController.query);
app.get('/list', catController.list);




//PUT

app.put('/update', catController.update);
app.put('/activate', catController.activate);
app.put('/desactivate', catController.desactivate);


//DELETE

app.delete('/remove', catController.remove)


export default app;