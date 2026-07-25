-- 1. Links category to store
alter table category
add constraint fk_store_id
foreign key (storeid)
references store(id);

-- 2. Links product to category
alter table product
add constraint fk_category_id
foreign key (categoryid)
references category(id);

-- 3. Links productcart to product
alter table productcart 
add constraint fk_product_id
foreign key (productid)
references product(id);

-- 4. Links productcart to cart
alter table productcart
add constraint fk_cart_id
foreign key (cartid)
references cart(id);

-- 5. Links cart to users
alter table cart
add constraint fk_user_id
foreign key (userid)
references users(id);

-- 6. Links productdays to product
alter table productdays
add constraint fk_product_days_product
foreign key (productid)
references product(id);

-- 7. Links productdays to daysofjob
alter table productdays
add constraint fk_product_days_job
foreign key (daysid)
references daysofjob(id);

-- 7. Links store to daysofjob
alter table daysofjob
add constraint fk_store
foreign key (storeid)
references store(id);
