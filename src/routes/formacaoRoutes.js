import { Router } from 'express';
import * as controller from '../controllers/formacaoControlers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router();

router.use(autenticarJWT);

router.get(
    '/',
    /* #swagger.tags = ['Formacao'] */
    /* #swagger.summary = 'Listar formacao do usuario logado' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listar
);

router.post(
    '/', 
    /* #swagger.tags = ['Formacao'] */
    /* #swagger.summary = 'criar formacao pro usuario logado' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.criar
);

router.delete(
    '/:id',
    /* #swagger.tags = ['Formacao'] */
    /* #swagger.summary = 'Remover Formacao' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.remover
);
export default router