import routerx from 'express-promise-router';
import catController from '../controllers/controllers-categoria';
import auth from '../middlewares/auth';

const app = routerx();

//POST

app.post('/add', auth.verifyUserAlmacenero, catController.add);


//GET

app.get('/query', auth.verifyUserAlmacenero, catController.query);
app.get('/list', auth.verifyUserAlmacenero, catController.list);




//PUT

app.put('/update', auth.verifyUserAlmacenero, catController.update);
app.put('/activate', auth.verifyUserAlmacenero, catController.activate);
app.put('/desactivate', auth.verifyUserAlmacenero, catController.desactivate);


//DELETE

app.delete('/remove', auth.verifyUserAlmacenero, catController.remove)


export default app;