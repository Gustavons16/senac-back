import { Router } from 'express';
import * as controller from '../controllers/dayofjobControllers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router();


router.get(
    '/:storeid',
    /* #swagger.tags = ['Dayofjob'] */
    /* #swagger.summary = 'Listar dias de trabalho da loja' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listar
);
router.post(
    '/addproduct',
     /* #swagger.tags = ['Dayofjob'] */
    /* #swagger.summary = 'adiciona o produto ao dia' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.addproduct
)

router.post(
    '/', 
    /* #swagger.tags = ['Dayofjob'] */
    /* #swagger.summary = 'criar dia de serviço da loja' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.criar
);

router.delete(
    '/:id',
    /* #swagger.tags = ['Dayofjob'] */
    /* #swagger.summary = 'Remover dia' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.remover
);
export default router