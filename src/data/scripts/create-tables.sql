create table if not exists store (
  id bigint generated always as identity primary key,
  name text,
  address text, -- Corrigido de 'adress' para 'address'
  password text,
  email text
);

create table if not exists users ( -- Traduzido de 'usuario'
  id bigint generated always as identity primary key,
  email text, 
  password text,
  name text,
  cellphone text,
  datebirth date
);

create table if not exists category ( 
  id bigint generated always as identity primary key,
  name text,
  description text,
  storeid int
);

create table if not exists product ( 
  id bigint generated always as identity primary key,
  name text,
  description text,
  price float,
  categoryid int,
  photo text,
  ingredients text
);

create table if not exists cart ( 
  id bigint generated always as identity primary key,
  price float,
  date date, 
  discount float,
  userid int,
  status text
);

create table if not exists productcart ( 
  id bigint generated always as identity primary key,
  productid int,
  cartid int
);

create table if not exists daysofjob ( 
  id bigint generated always as identity primary key,
  days text
);

create table if not exists productdays ( -- Traduzido de 'diasdeprodutos'
  id bigint generated always as identity primary key,
  daysid int,
  productid int
);
