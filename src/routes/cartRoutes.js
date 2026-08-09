import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';
import { atualizarStatusPedido } from '../controllers/pedidosController.js';

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

// Atualizar carrinho (recalcular total e desconto)
router.put(
  '/atualizar',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Atualizar carrinho (recalcular total e desconto)' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.atualizarCarrinho
);

// Finalizar compra do carrinho
router.post(
  '/finalizar',
  /* #swagger.tags = ['Carrinho'] */
  /* #swagger.summary = 'Finalizar compra do carrinho' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  controller.finalizarCarrinho
);

// Atualizar status de um pedido já finalizado
router.put(
  '/pedido/:id/status',
  /* #swagger.tags = ['Pedidos'] */
  /* #swagger.summary = 'Atualizar status do pedido' */
  /* #swagger.security = [{ "bearerAuth": [] }] */
  atualizarStatusPedido
);

export default router;
