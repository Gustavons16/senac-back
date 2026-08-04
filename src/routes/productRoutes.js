import {Router} from 'express'
import * as controller from '../controllers/productController.js' ;
import { autenticarJWT } from '../middlewares/autenticacao.js'

const router = Router();
router.get(
    '/dayproducts/:dayid/store/:storeid' ,
      /* #swagger.tags = ['Produto'] */
    /* #swagger.summary = 'Listar produtos do dia' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listardia
)


router.get(
      '/:storeid' ,
      /* #swagger.tags = ['Produto'] */
    /* #swagger.summary = 'Listar produto da loja selecionada' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listar
);

router.post(
    '/',
     /* #swagger.tags = ['Produto'] */
        /* #swagger.summary = 'criar Produto' */
        /* #swagger.security = [{ "bearerAuth": [] }] */
        controller.criar
);

router.delete(
    '/:id',
    /* #swagger.tags = ['Produto'] */
    /* #swagger.summary = 'Remover produto' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.remover
);
export default router