import routerx from 'express-promise-router';
import ArtController from '../controllers/controllers-articulo';

const app = routerx();

//POST

app.post('/add', ArtController.add);

//GET

app.get('/query', ArtController.query);
app.get('/queryCode', ArtController.queryCode);
app.get('/list', ArtController.list);


//PUT

app.put('/update', ArtController.update);
app.put('/activate', ArtController.activate);
app.put('/desactivate', ArtController.desactivate);

//DELETE

app.delete('/remove', ArtController.remove );




export default app;