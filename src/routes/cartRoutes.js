import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router();

router.use(autenticarJWT);

// Adicionar produto ao carrinho
router.post(
  '/produto/:produtoid',
  /* #swagger.tags = ['Cart'] */
  /* #swagger.summary = 'Adicionar produto ao carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.adicionarProduto
);

// Remover produto do carrinho
router.delete(
  '/productcart/:productcartid',
  /* #swagger.tags = ['Cart'] */
  /* #swagger.summary = 'Remover produto do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.removerProduto
);

// Listar produtos do carrinho
router.get(
  '/produtos',
  /* #swagger.tags = ['Cart'] */
  /* #swagger.summary = 'Listar produtos do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.listarProdutos
);

router.get(
  '/carrinhos',
  /* #swagger.tags = ['Cart'] */
  /* #swagger.summary = 'Listar produtos do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.listarCarrinhos
);

// Atualizar status de um pedido já finalizado
router.put(
  '/:id/status',
  /* #swagger.tags = ['Cart'] */
  /* #swagger.summary = 'Atualizar status do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.atualizarStatusPedido
);

export default router;
