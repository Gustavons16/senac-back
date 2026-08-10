import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function adicionarProduto(req, res) {
    const { produtoid } = req.params;
    const usuarioid = req.usuarioId;
    var cartid = 0;

    const db = await getDatabase();

    const resultadocarrinho = await db.get(
        "SELECT * FROM cart WHERE userid = ? AND (status IS NULL OR status = 'aberto') ORDER BY date DESC",
        [usuarioid]
    );

    if (resultadocarrinho == null) {
        const resultadoinsert = await db.run(
            'INSERT INTO cart (price, discount, userid, status) VALUES (?, ?, ?, ?)',
            [0, 0, usuarioid, 'aberto']
        );
        cartid = resultadoinsert.lastID;
    } else {
        cartid = resultadocarrinho.id;
    }

    const resultado = await db.run(
        'INSERT INTO productcart (productid, cartid) VALUES (?, ?)',
        [produtoid, cartid]
    );

    res.status(201).json({
        id: resultado.lastID,
        cartid,
        mensagem: 'PRODUTO ADICIONADO AO CARRINHO COM SUCESSO'
    });
}

export async function listarProdutos(req, res) {
    const usuarioid = req.usuarioId;
    var cartid = 0;

    const db = await getDatabase();

    const resultadocarrinho = await db.get(
        'SELECT * FROM cart WHERE userid = ? AND (status IS NULL OR status = "aberto") ORDER BY date DESC',
        [usuarioid]
    );

    if (resultadocarrinho == null) {
        const resultadoinsert = await db.run(
            'INSERT INTO cart (price, discount, userid, status) VALUES (?, ?, ?, ?)',
            [0, 0, usuarioid, 'aberto']
        );
        cartid = resultadoinsert.lastID;
    } else {
        cartid = resultadocarrinho.id;
    }

    const produtos = await db.all(
        `SELECT pc.id AS productcartid, p.*
         FROM product p
         INNER JOIN productcart pc ON p.id = pc.productid
         INNER JOIN cart c ON c.id = pc.cartid
         WHERE c.id = ?`,
        [cartid]
    );

    const subtotal = produtos.reduce((soma, p) => soma + Number(p.price), 0);
    const desconto = Number(resultadocarrinho?.discount ?? 0);

    res.json({
        cartid,
        produtos,
        subtotal,
        discount: desconto,
        total: Math.max(0, subtotal - desconto)
    });
}
export async function removerProduto(req, res) {
    const { productcartid } = req.params;
    const usuarioid = req.usuarioId;

    const db = await getDatabase();

    const resultado = await db.run(
        `DELETE FROM productcart
         WHERE id = ?
           AND cartid IN (
             SELECT id FROM cart
             WHERE userid = ? AND (status IS NULL OR status = "aberto")
           )`,
        [productcartid, usuarioid]
    );

    if (resultado.changes === 0) {
        return res.status(404).json({ mensagem: 'PRODUTO NÃO ENCONTRADO NO CARRINHO' });
    }

    res.json({ mensagem: 'PRODUTO REMOVIDO COM SUCESSO' });
}

export async function atualizarStatusPedido(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const db = await getDatabase();
    const atual = await db.get(
        'SELECT status FROM cart WHERE id = ?',
        [id]
    );

    if (!atual) {
        return res.status(404).json({ mensagem: 'Carrinho não encontrado.' });
    }

    const resultado = await db.run(
        'UPDATE cart SET status = ? WHERE id = ?',
        [status, id]
    );

    if (resultado.changes === 0) {
        return res.status(404).json({ mensagem: 'CARRINHO NÃO ATUALIZADO' });
    }

    res.json({ mensagem: 'STATUS ATUALIZADO COM SUCESSO' });

}