import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function listar(req, res) {
    const { storeid } = req.params;
    const db = await getDatabase();

    const products = await db.all(
        ' SELECT p.id, p.name, p.description, p.price, p.categoryid, p.photo, p.ingredients FROM product p inner join category c on c.id = p.categoryid inner join store s on s.id = c.storeid WHERE s.id = ?',
        [storeid]
        
    );
    res.json(products);
}
    
export async function criar(req, res) {
    const { name, description, price, categoryid, photo, ingredients } = req.body;

    if (!name) {
        return res.status(400).json({ mensagem: 'informe um produto válido.' });
    }

    const db = await getDatabase();
    const resultado = await db.run(
        'INSERT INTO product (name,description, price, categoryid, photo, ingredients) VALUES (?, ?, ?, ?, ?, ?)',
        [name,description, price, categoryid, photo, ingredients]
    );

    res.status(201).json({
        id: resultado.lastID,
        mensagem: 'PRODUTO CRIADO COM SUCESSO'
    })
}

export async function remover(req, res) {
    const { id } = req.params;
    const db = await getDatabase();
    const resultado = await db.run(
        'DELETE FROM product WHERE id = ? ',
        [id]
    );

    if (resultado.changes === 0) {
        return res.status(404).json({ mensagem: 'produto não removido.' });
    }

    res.json({ mensagem: 'produto removida com sucesso.' })
}