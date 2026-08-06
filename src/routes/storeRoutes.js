import { Router } from 'express';
import * as controller from '../controllers/storeControllers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router ();

router.use(autenticarJWT);

router.get(

      '/',
      /* #swagger.tags = ['Store'] */
    /* #swagger.summary = 'Listar Store do usuario logado' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listar
);

  router.post(
    '/',
    /* #swagger.tags = ['Store'] */
    /* #swagger.summary = 'criar store pro usuario logado' */
    /* #swagger.security = {{ "bearerAuth": [] }] */
    controller.criar
  );

  router.delete(
      '/:id',
     /* #swagger.tags = ['Store'] */
    /* #swagger.summary = 'Remover Store' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.remover
  );
  export default router