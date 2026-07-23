/* ==========================================================
   SCRIPT DE DADOS DE EXEMPLO
   Projeto: Sistema de Pedidos
   Banco preparado para UMA ÚNICA LOJA
   ========================================================== */

/*==========================================================
STORE (Antiga LOJA)
==========================================================*/

INSERT INTO store
(name, address, password, email) -- Ajustado 'adress' para 'address'
VALUES
('Quitutes da Monica','Jardim Camburi','quitutes123','quitutesdamonica@gmail.com');


/*==========================================================
USERS (Antigos USUARIOS)
==========================================================*/

INSERT INTO users
(email, password, name, cellphone, datebirth) -- Ajustado 'datanascimento' para 'datebirth'
VALUES
('gustavo123@gmail.com','gustavinho0202','Gustavo Silva','82993941145','2009-07-17'),
('maria@gmail.com','maria123','Maria Oliveira','27999990001','1998-03-15'),
('joao@gmail.com','joao123','João Pedro','27999990002','1995-06-20'),
('ana@gmail.com','ana123','Ana Clara','27999990003','2001-11-10'),
('lucas@gmail.com','lucas123','Lucas Souza','27999990004','1997-08-08'),
('beatriz@gmail.com','bia123','Beatriz Lima','27999990005','2000-02-14'),
('carlos@gmail.com','carlos123','Carlos Henrique','27999990006','1992-12-25'),
('fernanda@gmail.com','fer123','Fernanda Alves','27999990007','1999-09-30'),
('rafael@gmail.com','rafa123','Rafael Costa','27999990008','1996-05-12'),
('juliana@gmail.com','ju123','Juliana Martins','27999990009','1994-01-18');


/*==========================================================
CATEGORY (Antigas CATEGORIAS)
==========================================================*/

INSERT INTO category
(name, description, storeid) -- Ajustado 'descricao' para 'description' e 'loja_id' para 'storeid'
VALUES
('Pratos Mineiros','Comidas típicas de Minas Gerais',1),
('Sobremesas','Doces caseiros',1),
('Massas','Massas artesanais',1),
('Bebidas','Sucos e refrigerantes',1),
('Lanches','Hambúrgueres artesanais',1),
('Saladas','Saladas frescas',1),
('Pratos Executivos','Almoço executivo',1),
('Porções','Petiscos e porções',1),
('Café da Manhã','Cafés, bolos e pães',1),
('Vegetarianos','Pratos sem carne',1);


/*==========================================================
PRODUCT (Antigos PRODUTOS)
==========================================================*/

INSERT INTO product
(name, description, price, categoryid, photo, ingredients) -- Ajustado 'descricao' para 'description' e 'category_id' para 'categoryid'
VALUES
('Feijoada','Serve duas pessoas',54,1,'does not exist','Feijão preto, bacon, linguiça, torresmo'),
('Frango com Quiabo','Prato mineiro tradicional',42,1,'does not exist','Frango, quiabo, arroz'),
('Tutu à Mineira','Tutu com linguiça e ovo',39,1,'does not exist','Feijão, farinha, linguiça'),
('Pudim','Pudim de leite condensado',20,2,'does not exist','Leite condensado, leite, ovos'),
('Brigadeirão','Sobremesa de chocolate',22,2,'does not exist','Chocolate, leite condensado'),
('Mousse de Maracujá','Mousse caseira',18,2,'does not exist','Maracujá, creme de leite'),
('Lasanha Bolonhesa','Lasanha artesanal',45,3,'does not exist','Massa, carne, queijo'),
('Nhoque ao Molho','Nhoque artesanal',40,3,'does not exist','Batata, molho de tomate'),
('Suco Natural','Suco de laranja',9,4,'does not exist','Laranja'),
('Refrigerante Lata','350ml',7,4,'does not exist','Refrigerante'),
('X-Burguer','Hambúrguer artesanal',28,5,'does not exist','Carne, queijo, pão'),
('X-Salada','Hambúrguer com salada',30,5,'does not exist','Carne, queijo, alface e tomate'),
('Salada Caesar','Salada Caesar tradicional',24,6,'does not exist','Alface, frango, parmesão'),
('Salada Tropical','Salada com frutas',26,6,'does not exist','Alface, manga, tomate'),
('Filé Executivo','Filé com arroz e fritas',39,7,'does not exist','Filé bovino, arroz, fritas'),
('Frango Executivo','Frango grelhado',35,7,'does not exist','Frango, arroz, feijão'),
('Batata Frita','Porção grande',22,8,'does not exist','Batata'),
('Torresmo','Porção crocante',25,8,'does not exist','Carne suína'),
('Pão de Queijo','6 unidades',14,9,'does not exist','Polvilho, queijo'),
('Lasanha de Berinjela','Opção vegetariana',38,10,'does not exist','Berinjela, queijo, molho');


/*==========================================================
CART (Antigos CARRINHOS)
==========================================================*/

INSERT INTO cart
(price, date, discount, userid, status) -- Ajustado 'valor' para 'price' e 'data' para 'date'
VALUES
(74,'2026-07-13',5,1,'novo'),
(42,'2026-07-13',0,2,'novo'),
(61,'2026-07-13',3,3,'pago'),
(37,'2026-07-14',0,4,'novo'),
(64,'2026-07-14',6,5,'entregue'),
(54,'2026-07-14',2,6,'novo'),
(44,'2026-07-15',0,7,'cancelado'),
(58,'2026-07-15',5,8,'pago'),
(48,'2026-07-16',0,9,'novo'),
(52,'2026-07-16',4,10,'entregue');


/*==========================================================
PRODUCTCART (Antigos PRODUTOS DO CARRINHO)
==========================================================*/

INSERT INTO productcart
(productid, cartid) -- Ajustado 'carrinhoid' para 'cartid'
VALUES
(1,1),(4,1),
(2,2),(9,2),
(3,3),(18,3),
(5,4),(10,4),
(6,5),(15,5),
(7,6),(17,6),
(8,7),(19,7),
(11,8),(20,8),
(12,9),(13,9),
(14,10),(16,10);


/*==========================================================
DAYSOFJOB (Antigos DIAS DE TRABALHO)
==========================================================*/

INSERT INTO daysofjob (days) -- Ajustado tabela para 'daysofjob' e coluna para 'days'
VALUES
('segunda'),
('terça'),
('quarta'),
('quinta'),
('sexta'),
('sábado'),
('domingo');


/*==========================================================
PRODUCTDAYS (Antigos DIAS DOS PRODUTOS)
==========================================================*/

INSERT INTO productdays -- Ajustado tabela para 'productdays'
(daysid, productid) -- Ajustado 'produtoid' para 'productid'
VALUES
(1,1),(5,1),
(2,2),(4,2),
(3,3),(6,3),
(1,4),(2,4),(3,4),(4,4),(5,4),(6,4),(7,4),
(1,5),(2,5),(3,5),(4,5),(5,5),(6,5),(7,5),
(1,6),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),
(2,7),(3,7),(4,7),(5,7),(6,7),(7,7),
(2,8),(3,8),(4,8),(5,8),(6,8),(7,8),
(1,9),(2,9),(3,9),(4,9),(5,9),(6,9),(7,9),
(1,10),(2,10),(3,10),(4,10),(5,10),(6,10),(7,10),
(1,11),(2,11),(3,11),(4,11),(5,11),(6,11),(7,11),
(1,12),(2,12),(3,12),(4,12),(5,12),(6,12),(7,12),
(1,13),(2,13),(3,13),(4,13),(5,13),(6,13),(7,13),
(1,14),(2,14),(3,14),(4,14),(5,14),(6,14),(7,14),
(1,15),(2,15),(3,15),(4,15),(5,15),
(1,16),(2,16),(3,16),(4,16),(5,16),
(1,17),(2,17),(3,17),(4,17),(5,17),(6,17),(7,17),
(1,18),(2,18),(3,18),(4,18),(5,18),(6,18),(7,18),
(1,19),(2,19),(3,19),(4,19),(5,19),(6,19),(7,19),
(1,20),(2,20),(3,20),(4,20),(5,20);
