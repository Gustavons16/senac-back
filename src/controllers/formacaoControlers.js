import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function listar(req, res) {
    const db = await getDatabase();
    
    const formacao = await db.all(
        'SELECT id, titulo,descricao, usuarioid FROM formacoes WHERE usuarioid = ?' ,
        [req.usuarioId]
        
    );
    res.json(formacao);

}

export async function criar(req, res) {
    const { titulo,descricao} =req.body;
    

    if (!titulo) {
        return res.status(400).json({ mensagem: 'informe um título válido.'});
     } 

      const db = await getDatabase();
      const resultado = await db.run(
        'INSERT INTO formacoes (titulo,descricao, usuarioid) VALUES (?, ?, ?)',
        [titulo,descricao, req.usuarioId]
      );
      
      res.status(201).json({
        id: resultado.lastID,
        mensagem: 'USUARIO CRIADO COM SUCESSO'
      })
}  
export async function remover(req, res) {
    const {id} = req.params;
    const db = await getDatabase();
    const resultado = await db.run(
    'DELETE FROM formacoes WHERE id = ? AND usuarioid = ?',
    [id, req.usuarioId]
    );

    if (resultado.changes === 0) {
       return res.status(404).json({ mensagem: 'formacao não removida.'});
    } 
    
    res.json({mensagem: 'formacao removida com sucesso.'})
}