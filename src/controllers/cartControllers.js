import { getDatabase } from '../data/db.js';
import { RecordExpiration$ } from '@aws-sdk/client-s3';

export async function adicionarProduto(req, res) {
    const {produtoid} = req.params;
    const usuarioid = req.usuarioId;
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
    'DELETE FROM productcart where id=?',
    [productcartid]
    );
    
    res.json({
    mensagem: 'PRODUTO REMOVIDO COM SUCESSO'
    })
}

export async function listarProdutos(req,res) {
   const usuarioid = req.usuarioId;
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
    const produtos = await db.all(
        'SELECT pc.id as productcartid, p.* from product p inner join productcart pc on p.id = pc.productid inner join cart c on c.id = pc.cartid where c.id = ?',
        [cartid]
    )
    res.json(produtos);
}