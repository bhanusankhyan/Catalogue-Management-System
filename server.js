const express = require('express');
const {Client} = require('pg');

const app = express();
const port = 8000;
app.use(express.json())

// Setting Up Postgres Database Connection
const client = new Client({
  user: "cms",
  host: "localhost",
  database: "catalogue",
  password: "cms",
  port: 5432
});

//Connecting to Database
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to database')
  }
});

// API for Products
app.get('/api/products', async(req, res) => {
  const data = await readProducts();
    res.send(JSON.stringify(data))
})

// API for Filtering Data according to Brand and Category
app.post('/api/product_listing',async (req, res) => {
  var filtered_categories = []
  var filtered_brands = []
  const categories = req.body[1].categories
  const brands = req.body[0].brands
  if (brands !== null){
    for(let item in brands){
      const data = await filterBrands(brands[item]['label'])
      if(data.length !== 0){
        for (let value in data){
          filtered_brands.push(data[value])
        }
      }

    }
  }
  if (categories !== null){
    for (let item in categories){
      const parent = await client.query(`select category_id, category_name from categories where category_name like '${categories[item]['label']}'`)
      for (let value in parent.rows){
        filtered_categories.push(parent.rows[value])
      }
      const data = await filterCategories(categories[item]['label'])
      if(data.length !== 0){
        for (let value in data){
          filtered_categories.push(data[value])
        }
      }
    }
  }
  categories_filtered = []
  let result_categories = [...new Map(filtered_categories.map(obj => [JSON.stringify(obj), obj])).values()];
  let products = []
  for (let item in result_categories){
    let data = await client.query(`select * from queryv3 where category_name like '${result_categories[item]['category_name']}'`)
    for(let value in data.rows){
      products.push(data.rows[value])
    }

  }
  let final_products = []
  if(brands == null ){
    final_products = products
  }
  else if(categories == null){
    final_products = filtered_brands
  }
  else{
    let arr1 = products.filter(e => {
   return filtered_brands.some(item => item.product_id === e.product_id);
});
    final_products =  arr1
  }
  res.send(JSON.stringify(final_products))

})

// API for Creating Brand
app.post('/api/createbrand', async (req,res) => {
    const data = req.body[0]
    const result = await createBrand(data['brand_name'])
    res.send(JSON.stringify([{result:result}]))
})

// API for Listing Categories
app.get('/api/select-category', async(req, res) => {
  const result = await client.query('select category_name,category_id from categories')
  res.send(JSON.stringify(result.rows))
})

// API for Creating Categories
app.post('/api/create-category', async(req, res) => {
  const data = req.body[0]
  const result = await createCategory(data)
  res.send(JSON.stringify([{result:result}]))
})

//API to Fetch Particular Product Data and Specifying its Parent to Child Path
app.get('/api/product/:id', async(req,res) => {
  const data = await readProductData(req.params.id)
  if (data[0]['product'] == true){
  var bread = ""
  if (data[0]['product_data'][0]['parent_name'] != '' ){
    bread = await readBreadcrum(data[0]['product_data'][0]['parent_name'])
    bread = bread +"/"+ data[0]['product_data'][0]['category_name']
  }
  else{
    bread = "/"+data[0]['product_data'][0]['category_name']
  }
  }
  data[0]['breadcrum'] = bread
  breadCrum = ""
  res.send(JSON.stringify(data))
})

// API to fetch Data of a Parent to Child Hierarchy
app.get('/api/hier/*', async(req,res) => {
  let param = req.params[0]
  if(param.charAt(param.length-1) == '/'){
    param = param.slice(0,-1)
  }
  const child = param.split("/").slice(-1)

  const data = await readHierarchy(child[0].replace(/-/g," "))
  const parent = await client.query(`select category_id, category_name from categories where category_name like '${child[0].replace(/-/g," ")}'`)
  hierTree.push(parent.rows[0])
  var products = []
  for(let item in data){
    let product = await client.query(`select * from queryv3 where category_name like '${data[item]['category_name']}'`)
    for(let value in product.rows){
      products.push(product.rows[value])
    }
  }
  hierTree = []
  res.send(JSON.stringify(products))
})

// API to fetch Brands
app.get('/api/brands', async(req,res) => {
  const data = await client.query('select * from brands')
  res.send(JSON.stringify(data.rows))
})

// API for a Product Creation
app.post('/api/create-product', async(req, res) => {
  const data = req.body[0]
  const create_product = await createProduct(data.product_name, data.brand_id, data.description)
  if(create_product != 1){
    res.send(JSON.stringify({result:create_product}))
  }
  else{
    const productId = await client.query(`select product_id from products where product_name like '${data.product_name}'`)
    const mappingCategory = await client.query(`insert into categoryProduct (category_id,product_id) \
    values \
    ('${data.category_id}','${productId.rows[0].product_id}')`)
    if(data.specs_keys[0].key !== ""){
      for(let item in data.specs_keys){
        await client.query(`insert into specifications (product_id,key,value,unit) \
        values \
        (${productId.rows[0].product_id},'${data.specs_keys[item]['key']}','${data.specs_keys[item]['value']}','${data.specs_keys[item]['unit']}')`)
      }
    }
    res.send(JSON.stringify({result:'success'}))
}
})



// Function to Read Products from Database
async function readProducts() {
    try {
    const results = await client.query("select * from queryv3");
    return results.rows;
    }
    catch(e){
      console.log(e)
        return e;
    }
}

// Function to get Children of a Category
var categories_filtered = []
async function filterCategories(data){
  try{
      let children = await client.query(`select category_id, category_name from categories where parent_name like '${data}'`)
      for (item in children.rows){
        categories_filtered.push(children.rows[item])
        await filterCategories(children.rows[item].category_name)
      }
      return categories_filtered
    }
  catch(e){
    console.log(e)
    return []
  }
}

// Function to Collect Data of Products Related to Brands
async function filterBrands(data){
  try{
    let products = await client.query(`select * from queryv3 where brand_name like '${data}'`)
    return products.rows
  }
  catch(e){
    console.log(e)
    return []
  }
}

// Function to Create Brand
async function createBrand(brand_name) {
  try{
    const result = await client.query(`insert into brands (brand_name) values ('${brand_name}')`)
    return result.rowCount
  }
  catch(e){
    return e.detail
  }
}

// Function to Create Category
async function createCategory(data) {
  try{
    const result = await client.query(`insert into categories (category_name, parent_name) values ('${data.category_name}','${data.parent_name}')`)
    return result.rowCount
  }
  catch(e){
    return e.detail
  }
}

// Function to Read Full Product Data
async function readProductData(id){
  try{
    const result = await client.query(`select * from queryv3 where product_id = ${id}`)
    const spec = await client.query(`select key, value, unit from specifications where product_id = ${id}`)
    let data = []
    if(result.rows.length == 0)
    data = [{product_data:result.rows,specifications:spec.rows,product:false}]
    else{
    data = [{product_data:result.rows,specifications:spec.rows,product:true}]
    }
    return data
  }
  catch(e){
    return e.detail
  }
}

// Function to get Hierarchy of Child to Parent
var breadCrum=  ""
async function readBreadcrum(parent_name){
  breadCrum = breadCrum.concat(parent_name,"/")
  var result = ""
  try{
  const bread = await client.query(`select parent_name from categories where category_name like \'${parent_name}\'`)
  if(bread.rows[0]['parent_name'] != ''){
    await readBreadcrum(bread.rows[0]['parent_name'])
  }
  return breadCrum.split('/').reverse().join('/')

  }
  catch(e){
    console.log(e)
    return []
  }
}

// Function to Fetch Hierarchy Category Data
var hierTree = []
async function readHierarchy(parent){
  try{
    const children = await client.query(`select category_id, category_name from categories where parent_name like '${parent}'`)
    for (let item in children.rows){
      hierTree.push(children.rows[item])
      await readHierarchy(children.rows[item].category_name)
    }
    return hierTree

  }
  catch(e){
    console.log(e)
    return []
  }
}

// Function to Create Product
async function createProduct(product_name, brand_id, description) {
  try{
    const result = await client.query(`insert into products (product_name,brand_id,description) \
    values \
    ('${product_name}','${brand_id}','${description}')`)
    return result.rowCount
  }
  catch(e){
    console.log(e.detail)
    return e.detail
  }
}


app.listen(port, () => console.log(`Server started on port ${port}`));
