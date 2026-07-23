import { Router } from 'express';
import * as controller from '../controllers/interessesControler.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router();

router.use(autenticarJWT);

router.get(
    '/',
    /* #swagger.tags = ['Interesses'] */
	/* #swagger.summary = 'Listar Interesses do usuario logado' */
	/* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listar
);

router.post(
    '/', 
    /* #swagger.tags = ['Interesses'] */
	/* #swagger.summary = 'criar interesses pro usuario logado' */
	/* #swagger.security = [{ "bearerAuth": [] }] */
    controller.criar
);

router.delete(
    '/:id',
    /* #swagger.tags = ['Interesses'] */
	/* #swagger.summary = 'Remover interesse' */
	/* #swagger.security = [{ "bearerAuth": [] }] */
    controller.remover
);
export default router

