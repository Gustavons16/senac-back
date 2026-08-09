import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';
import { finalizarPedido, atualizarStatusPedido } from '../controllers/pedidosController.js';

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

// Remover Produto do Carrinho
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

// Atualizar item ou status do pedido
router.put(
  '/atualizar/:id',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Atualizar pedido do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  atualizarStatusPedido
);

// Finalizar pedido
router.post(
  '/finalizar',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Finalizar pedido do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  finalizarPedido
);

export default router;
