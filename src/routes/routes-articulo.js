import routerx from 'express-promise-router';
import ArtController from '../controllers/controllers-articulo';
import auth from '../middlewares/auth';

const app = routerx();

//POST

app.post('/add', auth.verifyUserAlmacenero, ArtController.add);

//GET

app.get('/query', auth.verifyUserAlmacenero, ArtController.query);
app.get('/queryCode', auth.verifyUser, ArtController.queryCode);
app.get('/list', auth.verifyUserAlmacenero, ArtController.list);


//PUT

app.put('/update', auth.verifyUserAlmacenero, ArtController.update);
app.put('/activate', auth.verifyUserAlmacenero, ArtController.activate);
app.put('/desactivate', auth.verifyUserAlmacenero, ArtController.desactivate);

//DELETE

app.delete('/remove', auth.verifyUserAlmacenero, ArtController.remove );




export default app;