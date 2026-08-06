import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function adicionarProduto(req, res) {
    const {produtoid} = req.params;
    const usuarioid = req.usuarioid;
    var cartid = 0 

    const db = await getDatabase();
    
    const resultadocarrinho = await db.get(
        "SELECT *from cart where userid = ? order by date desc",
        [usuarioid]
    )
    if(resultadocarrinho==null){
        const resultadoinsert = await db.run(
        'INSERT INTO cart (price,discount,userid) VALUES (?, ?, ?)',
        [0,0,usuarioid]
        );
        cartid = resultadoinsert.lastID
    } 
    else{
        cartid=resultadocarrinho.id

    }


    const resultado = await db.run(
    'INSERT INTO productcart (productid, cartid) VALUES (?, ?)',
    [produtoid,cartid]
    );
    
    res.status(201).json({
    id: resultado.lastID,
    mensagem: 'PRODUTO ADICIONADO AO CARRINHO COM SUCESSO'
    })
}


export async function removerProduto(req, res) {
    const {productcartid} = req.params;
    const usuarioid = req.usuarioid;

    const db = await getDatabase();
    

    const resultado = await db.run(
    'DELETE productcart where id=?',
    [productcartid]
    );
    
    res.json({
    mensagem: 'PRODUTO REMOVIDO COM SUCESSO'
    })
}