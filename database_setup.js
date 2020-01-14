const {Pool, Client} = require('pg');

//Setting Up Postgres Database Connection
const pool = new Pool({
  user: "cms",
  host: "localhost",
  database: "catalogue",
  password: "cms",
  port: 5432
});
//Setting up Database
// Create Database "catalogue" in Postgres with User "cms", Password "cms"
//Create Views in order to execute some queries

//VIEW 1
//CREATE VIEW queryv1 AS select t1.brand_name, t2.product_id, t2.product_name,
//t2.description from brands AS t1, products AS t2 WHERE t1.brand_id = t2.brand_id;

//VIEW2
//CREATE VIEW queryv2 AS select t1.brand_name, t1.product_id, t1.product_name, t1.description ,
//t2.category_id from queryv1 AS t1, categoryProduct AS t2 WHERE t1.product_id = t2.product_id;

//VIEW3
//CREATE VIEW queryv3 AS select t1.brand_name, t1.product_id, t1.product_name, t1.description , 
//t2.category_name, t2.parent_name from queryv2 AS t1, categories AS t2 WHERE t1.category_id = t2.category_id;

// Creating Tables
// Table brands is used to store brand data
// Table products is used to store product's information with brand ID as foreign key reference
// Table categories is used to store category's data
// Table productCategory is used to store link between product and category with category ID and brand ID as foreign key reference
// table specifications is used to store specifications of product with product ID as foreign key reference


pool.query("CREATE TABLE brands (brand_id SERIAL PRIMARY KEY , \
  brand_name VARCHAR(100) UNIQUE NOT NULL)", (error, res) => {
  console.log(error, res);
  productsTable()
})

var productsTable = function(){
  pool.query("CREATE TABLE products (product_id SERIAL PRIMARY KEY , \
  product_name VARCHAR(100) UNIQUE NOT NULL, brand_id INT NOT NULL REFERENCES brands(brand_id) ON DELETE CASCADE, \
  description VARCHAR(1000))", (error, res) => {
  console.log(error, res);
  categoriesTable()
})
}

var categoriesTable = function(){
  pool.query("CREATE TABLE categories (category_id SERIAL PRIMARY KEY , \
  category_name VARCHAR(100) NOT NULL UNIQUE, parent_name VARCHAR(100))", (error, res) => {
  console.log(error, res);
  productCategoryTable()
})
}

var productCategoryTable = function(){
  pool.query("CREATE TABLE categoryProduct (id SERIAL PRIMARY KEY, \
  category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE, \
  product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE) ", (error, res) => {
    console.log(error,res);
    specificationsTable()
  })
}


var specificationsTable = function(){
  pool.query("CREATE TABLE specifications (spec_id SERIAL PRIMARY KEY, \
  product_id INT REFERENCES products(product_id) ON DELETE CASCADE, \
  key VARCHAR(50), value VARCHAR(50), unit VARCHAR(50))", (error, res) => {
  console.log(error, res);
pool.end();
});
}
