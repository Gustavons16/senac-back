import { Router } from 'express';
import * as controller from '../controllers/cartControllers.js';
import { autenticarJWT } from '../middlewares/autenticacao.js';

const router = Router();
router.use(autenticarJWT);


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

router.get(
    '/produtos',
    /* #swagger.tags = ['Carrinho'] */
    /* #swagger.summary = 'Listar produtos do carrinho' */
    /* #swagger.security = [{ "bearerAuth": [] }] */
    controller.listarProdutos
)
export default router;
