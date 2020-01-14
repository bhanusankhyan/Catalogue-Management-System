const {Pool, Client} = require('pg');

//Setting Up Postgreas Database Connection
const pool = new Pool({
  user: "cms",
  host: "localhost",
  database: "catalogue",
  password: "cms",
  port: 5432
});

//Inserting Values into Tables
pool.query("INSERT INTO brands (brand_name) \
  VALUES \
  ('Bosch'), \
  ('Ford'), \
  ('Toyota')",(error, res)=>{
  console.log(error, res);
  productsData()
});

var productsData = function(){
  pool.query("INSERT INTO products (product_name, brand_id, description) \
    VALUES \
    ('Bosch Angle Grinder GWS 600','1','Lorem Ipsum Lorem Ipsum Lorem Ipsum \
     Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum \
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum'), \
    ('Bosch Angle Grinder GWS 300','1',''), \
    ('Bosch Angle Grinder GWS 200','1',''),\
    ('Ford Fiesta','2',''), \
    ('Ford Figo','2',''), \
    ('Toyota Qualis','3','')",(error, res)=>{
    console.log(error, res);
    categoryData();
  });
}

var categoryData = function(){
  pool.query("INSERT INTO categories (category_name, parent_name) \
    VALUES \
    ('Power Tools',''), \
    ('Angle Grinders','Power Tools'), \
    ('Primary Grinders','Angle Grinders'), \
    ('Vehicles',''), \
    ('Cars','Vehicles'),\
    ('Trucks','Vehicles') ",(error, res)=>{
    console.log(error, res);
    productCategoryData()
  });
}

var productCategoryData = function(){
  pool.query("INSERT INTO categoryProduct (category_id, product_id) \
    VALUES \
    ('1','1'), \
    ('2','2'), \
    ('3','3'), \
    ('4','4'), \
    ('5','5'), \
    ('6','6')",(error, res)=>{
    console.log(error, res);
    specificationsData()
  });
}

var specificationsData = function() {
  pool.query("INSERT INTO specifications (product_id, key, value, unit) \
   VALUES \
   (1, 'Power', '600', 'Watts'), \
   (1, 'Model Number', 'GWS 600',''), \
   (1, 'Grinding Material', 'Sandstone','')", (error, res) => {
     console.log(error, res);
     pool.end();
   })
 }
