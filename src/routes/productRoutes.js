import {Router} from 'express'
import * as controller from '../controllers/productController.js' ;
import { autenticarJWT } from '../middlewares/autenticacao.js'
const router = Router();

router.use(autenticarJWT);


router.get(
    '/dayproducts/:day/store/:storeid' ,
      /* #swagger.tags = ['Product'] */
    /* #swagger.summary = 'Listar produtos do dia' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listardia
)


router.get(
      '/:storeid' ,
      /* #swagger.tags = ['Product'] */
    /* #swagger.summary = 'Listar produto da loja selecionada' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listar
);

router.post(
    '/',
     /* #swagger.tags = ['Product'] */
        /* #swagger.summary = 'criar Produto' */
        /* #swagger.security = [{ "bearerAuth": [] }] */
        controller.criar
);

router.delete(
    '/:id',
    /* #swagger.tags = ['Product'] */
    /* #swagger.summary = 'Remover produto' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.remover
);
router.get(
    '/produto/:id',
    /* #swagger.tags = ['Product'] */
        /* #swagger.summary = 'Buscar produto pelo Id' */
        /* #swagger.security = [{ "bearerAuth": [] }] */
        controller.buscar

)
export default router;