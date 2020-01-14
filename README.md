# Catalogue Management System
##### System to manage Brands and their products
##### Technologies Used - Frontend : React.js| Backend : Nodejs, Express| Database : Postgresql

##### To run the project please follow the steps:

###### #Clone the repository

###### #Installing Server Dependencies
 Locate into orignal directory<br>
 Run "npm install"<br>
 
###### #Installing Client Dependencies
 Run "npm run client-install"
 
###### #Before running the server we need to setup the database
  Create Database with name "catalogue" and create User with Username : "cms" Password : "cms"<br>
  Run "node database_setup.js" in order to setup Database<br>
  Run "node database_populate.js" to populate database with some dummy entries
  
##### Creating Database Views
  
  1. CREATE VIEW queryv1 AS select t1.brand_name, t2.product_id, t2.product_name,<br>
  t2.description from brands AS t1, products AS t2 WHERE t1.brand_id = t2.brand_id;
  
  2. CREATE VIEW queryv2 AS select t1.brand_name, t1.product_id, t1.product_name, t1.description ,<br>
  t2.category_id from queryv1 AS t1, categoryProduct AS t2 WHERE t1.product_id = t2.product_id;

  3. CREATE VIEW queryv3 AS select t1.brand_name, t1.product_id, t1.product_name, t1.description ,<br> 
  t2.category_name, t2.parent_name from queryv2 AS t1, categories AS t2 WHERE t1.category_id = t2.category_id;
  
### Run the developement server using "npm run dev"
