import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function listar(req, res) {
    const { storeid } = req.params
    const db = await getDatabase();

    const daysofjob = await db.all(
        'SELECT id, day, storeid FROM dayofjob WHERE storeid = ?' ,
        [storeid]
        
    );
    res.json(daysofjob);

}

export async function criar(req, res) {
    const { day,storeid} =req.body;
    

    if (!day) {
        return res.status(400).json({ mensagem: 'informe um dia válido.'});
     } 

      const db = await getDatabase();
      const resultado = await db.run(
        'INSERT INTO dayofjob (day,storeid) VALUES (?, ?)',
        [day,storeid]
      );
      
      res.status(201).json({
        id: resultado.lastID,
        mensagem: 'DIA CADASTRADO COM SUCESSO'
      })
}  
export async function remover(req, res) {
    const {id} = req.params;
    const db = await getDatabase();
    const resultado = await db.run(
    'DELETE FROM dayofjob WHERE id = ?',
    [id]
    );

    if (resultado.changes === 0) {
       return res.status(404).json({ mensagem: 'dia não removido.'});
    } 
    
    res.json({mensagem: 'dia removido com sucesso.'})

}


export async function addproduct(req, res) {
    const { daysid, productid} = req.body;

    if (daysid === 0|| productid=== 0) {
        return res.status(400).json({ mensagem: 'informe um dia e o produto válido.' });
    }

    const db = await getDatabase();
    const resultado = await db.run(
        'INSERT INTO productdays(daysid, productid) VALUES (?, ?)',
        [daysid, productid]
    );

    res.status(201).json({
        id: resultado.lastID,
        mensagem: 'PRODUTO ADICIONADO AO DIA COM SUCESSO'
    })
}