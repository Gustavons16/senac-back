import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function listar(req, res) {
    const db = await getDatabase();
    
    const interesses = await db.all(
        'SELECT id, titulo, usuarioid FROM interesses WHERE usuarioid = ?' ,
        [req.usuarioId]
        
    );
    res.json(interesses);

}

export async function criar(req, res) {
    const { titulo} =req.body;

    if (!titulo) {
        return res.status(400).json({ mensagem: 'informe um título válido.'});
     } 

      const db = await getDatabase();
      const resultado = await db.run(
        'INSERT INTO interesses (titulo, usuarioid) VALUES (?, ?)',
        [titulo, req.usuarioId]
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
    'DELETE FROM interesses WHERE id = ? AND usuarioid = ?',
    [id, req.usuarioId]
    );

    if (resultado.changes === 0) {
       return res.status(404).json({ mensagem: 'Interesse não removido.'});
    } 
    
    res.json({mensagem: 'Tarefa removida com sucesso.'})
}       