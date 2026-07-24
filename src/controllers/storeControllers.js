import { getDatabase } from '../data/db.js';

export async function listar(req, res) {
    const db =await getDatabase() ;
    const store =await db.all(
        'SELECT id,name, address, password, email FROM store'
    )
    res.json(store)

}

   export async function criar(req, res) {
    const { name,address, password, email} = req.body;

    if (!name || !address || !password || !email) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios ausentes.' });
  }
   
  const db = await getDatabase();
  const resultado = await db.run(
     'INSERT INTO store (name,address,password,email) VALUES (?, ?, ?, ?)',
     [name,address,password,email]
  );

  res.status(201).json({
    id: resultado.lastID,
    mensagem: 'LOJA CRIADA COM SUCESSO'
  })

}
export async function remover(req, res) {
    const {id} = req.params;
        const db = await getDatabase()
        const resultado = await db.run (
            'DELETE FROM store WHERE id = ?',
            [id]
        );
    
     if (resultado.changes === 0) {
         return res.status(404).json({ mensagem: 'store não removida.'});
     }
     
       res.json({mensagem: 'store removida com sucesso'})

    }
   