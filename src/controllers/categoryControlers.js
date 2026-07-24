import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function listar(req, res) {
    const {id} = req.params;
    const db = await getDatabase();
    
    const category = await db.all(
        'SELECT id, name, description, storeid FROM category WHERE storeid = ?' ,
        [id]
        
    );
    res.json(category);
    }

    export async function criar(req, res) {
    const { name,description} =req.body;
    

    if (!name) {
        return res.status(400).json({ mensagem: 'informe um nome válido.'});
     } 

      const db = await getDatabase();
      const resultado = await db.run(
        'INSERT INTO category (name,description, storeid) VALUES (?, ?, ?)',
        [name,description, req.storeId]
      );
      
      res.status(201).json({
        id: resultado.lastID,
        mensagem: 'CATEGORIA CRIADA COM SUCESSO'
      })
    }

    export async function remover(req, res) {
    const {id} = req.params;
    const db = await getDatabase();
    const resultado = await db.run(
    'DELETE FROM category WHERE id = ? ',
    [id]
    );

    if (resultado.changes === 0) {
       return res.status(404).json({ mensagem: 'categoria não removida.'});
    } 
    
    res.json({mensagem: 'categoria removida com sucesso.'})
}