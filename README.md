# Catalogue Management System
##### System to manage Categories, Brands and their products
##### Technologies Used - Frontend : React.js | Backend : Nodejs, Express | Database : Postgresql

##### To run the project please follow the steps:

###### #Clone the repository

###### #Installing Server Dependencies
 Locate into original directory<br>
 Run "npm install"<br>
 
###### #Installing Client Dependencies
 Run "npm run client-install"
 
###### #Before running the server we need to setup the database
  Create Database with name "catalogue" and create User with Username : "cms" Password : "cms"<br>
  Run "node database_setup.js" in order to setup Database<br>
  Add functions and triggers present in functions_and_triggers.txt to the database<br>
  Run "node database_populate.js" to populate database with some dummy entries
  
##### Creating Database Views
  
  1. create view queryv1 as select t1.brand_name, t2.product_id, t2.description, t2.product_name, <br>
  t2.category_id from brands as t1, products as t2 where t1.brand_id = t2.brand_id;
  
  2. create view queryv2 as select t1.brand_name, t1.product_id, t1.description, t1.product_name, <br>
  t2.category_name, t2.parent_name from queryv1 as t1, categories as t2 where t1.category_id = t2.category_id;
  
### Run the developement server using "npm run dev"
