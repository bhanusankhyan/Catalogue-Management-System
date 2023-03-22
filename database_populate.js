const {Pool, Client} = require('pg');

//Setting Up Postgreas Database Connection
// const pool = new Pool({
//   user: "cms",
//   host: "localhost",
//   database: "catalogue",
//   password: "cms",
//   port: 5432
// });

//Inserting Values into Tables
function populate(pool) {
pool.query("INSERT INTO brands (brand_name) \
  VALUES \
  ('Bosch'), \
  ('Ford'), \
  ('Toyota')",(error, res)=>{
  console.log(error, res);
  categoryData()
});

var productsData = function(){
  pool.query("INSERT INTO products (product_name, brand_id, category_id, description) \
    VALUES \
    ('Bosch Angle Grinder GWS 600','1','1','Lorem Ipsum Lorem Ipsum Lorem Ipsum \
     Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum \
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum'), \
    ('Bosch Angle Grinder GWS 300','1','2',''), \
    ('Bosch Angle Grinder GWS 200','1','3',''),\
    ('Ford Fiesta','2','5',''), \
    ('Ford Figo','2','5',''), \
    ('Toyota Qualis','3','6','')",(error, res)=>{
    console.log(error, res);
    specificationsData()
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
    productsData()
  });
}

var specificationsData = function() {
  pool.query("INSERT INTO specifications (product_id, key, value, unit) \
   VALUES \
   (1, 'Power', '600', 'Watts'), \
   (1, 'Model Number', 'GWS 600',''), \
   (1, 'Grinding Material', 'Sandstone','')", (error, res) => {
     console.log(error, res);
   })
 }
}

module.exports = { populate }
