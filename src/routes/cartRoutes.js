import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router();

router.use(autenticarJWT);

// Adicionar produto ao carrinho
router.post(
  '/produto/:produtoid',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Adicionar produto ao carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.adicionarProduto
);

// Remover produto do carrinho
router.delete(
  '/productcart/:productcartid',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Remover produto do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.removerProduto
);

// Listar produtos do carrinho
router.get(
  '/produtos',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Listar produtos do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.listarProdutos
);

router.get(
  '/carrinhos',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Listar produtos do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.listarCarrinhos
);

// Atualizar status de um pedido já finalizado
router.put(
  '/:id/status',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Atualizar status do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.atualizarStatusPedido
);

export default router;
