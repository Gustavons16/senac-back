import { getDatabase } from '../data/db.js';

// Finalizar o carrinho atual e transformá-lo em um Pedido
export async function finalizarPedido(req, res) {
    const usuarioid = req.usuarioId;

    try {
        const db = await getDatabase();

        // 1. Buscar o carrinho ativo do usuário
        const carrinho = await db.get(
            "SELECT * FROM cart WHERE userid = ? ORDER BY date DESC",
            [usuarioid]
        );

        if (!carrinho) {
            return res.status(404).json({ mensagem: 'Nenhum carrinho ativo encontrado para este usuário.' });
        }

        // 2. Buscar os produtos que estão dentro deste carrinho
        const produtosNoCarrinho = await db.all(
            `SELECT p.id as productid, p.price 
             FROM product p 
             INNER JOIN productcart pc ON p.id = pc.productid 
             WHERE pc.cartid = ?`,
            [carrinho.id]
        );

        if (produtosNoCarrinho.length === 0) {
            return res.status(400).json({ mensagem: 'O seu carrinho está vazio.' });
        }

        // 3. Calcular o valor total somando o preço de cada produto
        const total = produtosNoCarrinho.reduce((soma, prod) => soma + prod.price, 0);
        const statusInicial = 'aguardandoconfirmacao';

        // 4. Criar o pedido na tabela de pedidos
        // Nota: Removida a vírgula incorreta que havia no final do INSERT anterior
        const resultadoPedido = await db.run(
            'INSERT INTO pedidos (usuarioId, total, status) VALUES (?, ?, ?)',
            [usuarioid, total, statusInicial]
        );
        const pedidoId = resultadoPedido.lastID;

        // 5. [OPCIONAL] Se tiver uma tabela "itens_pedido", salva os produtos nela para histórico
        for (const produto of produtosNoCarrinho) {
            await db.run(
                'INSERT INTO itens_pedido (pedidoId, produtoId, preco_unitario) VALUES (?, ?, ?)',
                [pedidoId, produto.productid, produto.price]
            );
        }

        // 6. Limpar o carrinho antigo para desvinculá-lo do usuário (deletando os itens do productcart)
        await db.run('DELETE FROM productcart WHERE cartid = ?', [carrinho.id]);
        
        // Remove ou limpa o registro do carrinho principal para que no próximo 'listar' um novo seja criado
        await db.run('DELETE FROM cart WHERE id = ?', [carrinho.id]);

        return res.status(201).json({
            mensagem: 'PEDIDO FINALIZADO COM SUCESSO',
            pedidoId: pedidoId,
            total: total,
            status: statusInicial
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ 
            mensagem: 'Erro ao finalizar pedido.', 
            erro: erro.message 
        });
    }
}

// Atualizar o status de um pedido existente (Ex: via painel do Admin)
export async function atualizarStatusPedido(req, res) {
    const { id } = req.params; // ID do pedido passado na URL
    const { status } = req.body; // Novo status enviado no Body da requisição

    if (!status) {
        return res.status(400).json({ mensagem: 'O campo status é obrigatório.' });
    }

    try {
        const db = await getDatabase();

        // Verificar se o pedido realmente existe antes de atualizar
        const pedido = await db.get('SELECT * FROM pedidos WHERE id = ?', [id]);
        if (!pedido) {
            return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
        }

        // Atualizar o status no banco de dados
        await db.run(
            'UPDATE pedidos SET status = ? WHERE id = ?',
            [status, id]
        );

        return res.json({
            mensagem: 'STATUS DO PEDIDO ATUALIZADO COM SUCESSO',
            pedidoId: id,
            novoStatus: status
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ 
            mensagem: 'Erro ao atualizar status do pedido.', 
            erro: erro.message 
        });
    }
}
