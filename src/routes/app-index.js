import routerx from 'express-promise-router';
import Articulo from './routes-articulo';
import categoria from './routes-categoria';
import usuario from './routes-usuario';
import persona from './routes-persona';
import venta from '../routes/routes-venta'
import ingreso from '../routes/routes-ingreso';


const router = routerx();


router.use('/articulo', Articulo);
router.use('/categoria', categoria);
router.use('/usuario', usuario);
router.use('/persona', persona);
router.use('/venta', venta);
router.use('/ingreso', ingreso);



export default router;