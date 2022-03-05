import routerx from 'express-promise-router';
import persona from './routes-persona';
import Articulo from './routes-articulo';
import categoria from './routes-categoria';
import usuario from './routes-usuario';

const router = routerx();


router.use('/articulo', Articulo);
router.use('/categoria', categoria);
router.use('/usuario', usuario);
router.use('/persona', persona);



export default router;