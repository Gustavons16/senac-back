import { Router } from 'express';
import * as controller from '../controllers/categoryControlers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router();
router.use(autenticarJWT);

router.get(
    '/:id',
    /* #swagger.tags = ['Category'] */
    /* #swagger.summary = 'Listar Categoria da store logado' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listar
);

router.post(
    '/', 
    /* #swagger.tags = ['Category'] */
    /* #swagger.summary = 'criar categoria pra store logada' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.criar
);

router.delete(
    '/:id',
    /* #swagger.tags = ['Category'] */
    /* #swagger.summary = 'Remover Categoria' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.remover
);
export default router