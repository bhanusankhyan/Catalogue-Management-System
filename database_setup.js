const {Pool, Client} = require('pg');

//Setting Up Postgres Database Connection
// const pool = new Pool({
//   user: "cms",
//   host: "localhost",
//   database: "catalogue",
//   password: "cms",
//   port: 5432
// });
//Setting up Database
// Create Database "catalogue" in Postgres with User "cms", Password "cms"

// Creating Tables
// Table brands is used to store brand data
// Table products is used to store product's information with brand ID as foreign key reference
// Table categories is used to store category's data
// Table productCategory is used to store link between product and category with category ID and brand ID as foreign key reference
// table specifications is used to store specifications of product with product ID as foreign key reference

function database(pool) {
pool.query("CREATE TABLE brands (brand_id SERIAL PRIMARY KEY , \
  brand_name VARCHAR(100) UNIQUE NOT NULL, slug VARCHAR(100) UNIQUE)", (error, res) => {
  console.log(error, res);
  categoriesTable()
})

var categoriesTable = function(){
  pool.query("CREATE TABLE categories (category_id SERIAL PRIMARY KEY , \
  category_name VARCHAR(100) NOT NULL UNIQUE, parent_name VARCHAR(100), \
  slug VARCHAR(100) UNIQUE)", (error, res) => {
  console.log(error, res);
  productsTable();
})
}

var productsTable = function(){
  pool.query("CREATE TABLE products (product_id SERIAL PRIMARY KEY , \
  product_name VARCHAR(100) UNIQUE NOT NULL, brand_id INT NOT NULL REFERENCES brands(brand_id) ON DELETE CASCADE, \
  description VARCHAR(1000), slug VARCHAR(100) UNIQUE, category_id INT NOT NULL REFERENCES categories(category_id))", (error, res) => {
  console.log(error, res);
  specificationsTable()
})
}


var specificationsTable = function(){
  pool.query("CREATE TABLE specifications (spec_id SERIAL PRIMARY KEY, \
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE, \
  key VARCHAR(50), value VARCHAR(50), unit VARCHAR(50))", (error, res) => {
  console.log(error, res);
});
}
}

function trigger (pool) {
  pool.query(" \
  CREATE OR REPLACE FUNCTION slugify('value' TEXT) \
  RETURNS TEXT AS $$ \
  WITH 'lowercase' AS (SELECT lower ('value') AS 'value'), \
  'removed_spaces' as (select regexp_replace('value', '^[ \t]+|[ \t]+$','','gi') as 'value' from 'lowercase'), \
  'removed_quotes' as (select regexp_replace('value', '[''\"]+','','gi')as 'value' from 'removed_spaces'), \
  'hyphenated' AS ( select regexp_replace('value', '[^a-z0-9\\-_]+', '-', 'gi') AS 'value' from 'removed_quotes') \
  select 'value' from 'hyphenated'; \
  $$ LANGUAGE SQL STRICT IMMUTABLE; \
  create function public.set_slug_from_brand_name() returns trigger \
  language plpgsql \
  as $$ \
  begin \
  new.slug = slugify(new.brand_name); \
  return new; \
  end \
  $$; \
  create trigger 't_brands_insert' before insert on 'brands' for each row when (new.brand_name is not null and new.slug is null) \
  execute procedure set_slug_from_brand_name(); \
  create function public.set_slug_from_product_name() returns trigger \
  language plpgsql \
  as $$ \
  begin \
  new.slug := slugify(new.product_name); \
  return new; \
  end \
  $$; \
  create trigger 't_products-insert' before insert on 'products' for each row when (new.product_name is not null and new.slug is null) \
  execute procedure set_slug_from_product_name(); \
  create function public.set_slug_from_category_name() returns trigger \
  language plpgsql \
  as $$ \
  begin \
  new.slug = slugify(new.category_name); \
  return new; \
  end \
  $$; \
  create trigger 't_categories_insert' before insert on 'categories' for each row when (new.category_name is not null and new.slug is null) \
  execute procedure set_slug_from_category_name(); \
  "
  , (error, res) => {
    console.log(error, res)
    pool.end()
  })
}

module.exports = { database, trigger }
