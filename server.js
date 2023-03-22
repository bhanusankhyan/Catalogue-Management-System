const express = require('express');
const {Client} = require('pg');

const app = express();
const port = 8000;
app.use(express.json())

// Setting Up Postgres Database Connection
const client = new Client({
  user: "cms",
  host: "dpg-cgc9ult269v4icvedl4g-a",
  database: "catalogue",
  password: "4jWT1DKiKxBAPsDJoTI2cW9YeKUlCDPx",
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
    let brands_query = "select * from queryv2 where "
    for(let item in brands){
      if (parseInt(item)+1 === brands.length){
        brands_query = brands_query + `brand_name like '${brands[item].label}'`
      }
      else{
        brands_query = brands_query + `brand_name like '${brands[item].label}' OR `
      }
    }
      const data = await client.query(brands_query)
      if(data.rows.length !== 0){
        for (let value in data.rows){
          filtered_brands.push(data.rows[value])
        }
      }
  }
  if (categories !== null){
    //categories_query = "select category_id, category_name from categories where "
    let categories_query = "select category_id, category_name from categories where "
    for (let item in categories){
      if(parseInt(item)+1 === categories.length){
        categories_query = categories_query + `category_name like '${categories[item].label}'`
      }
      else {
        categories_query = categories_query + `category_name like '${categories[item].label}' OR `
      }
    }
    let parent = await client.query(categories_query)
      for (let value in parent.rows){
        filtered_categories.push(parent.rows[value])
        let data = await readHierarchy([{category_name:parent.rows[value].category_name}])
        if(data.length !== 0){
          for (let value in data){
            filtered_categories.push(data[value])
          }
        }
        hierTree = []
      }
  }

  let result_categories = [...new Map(filtered_categories.map(obj => [JSON.stringify(obj), obj])).values()];
  let products = []
  for (let item in result_categories){
    let data = await client.query(`select * from queryv2 where category_name like '${result_categories[item]['category_name']}'`)
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
    let parent = await client.query(`select category_name, slug from categories where category_name like '${data[0]['product_data'][0]['parent_name']}'`)
    let bread = await readBreadcrum(data[0]['product_data'][0]['category_name'])
    data[0]['breadcrum'] = bread
  }
  array = []
  bread_array = []
  res.send(JSON.stringify(data))
})

// API to fetch Data of a Parent to Child Hierarchy
app.get('/api/hier/*', async(req,res) => {
  let param = req.params[0]
  let data = []
  let products = {result:true,data:[],breadcrum:[]}
  if(param.charAt(param.length-1) == '/'){
    param = param.slice(0,-1)
  }
  const child = param.split("/").slice(-1)
  const parent_data = await client.query("select category_id, category_name from categories where slug like $1",[child[0]])
  data.push(parent_data.rows[0])
  if(parent_data.rows.length === 0){
    products.result = false
  }
  else{
    const parent_check = await readBreadcrum(parent_data.rows[0].category_name)
    array = []
    bread_array = []
    if(parent_check[parent_check.length-1].link !== '/'+param){
      products.result = false
    }
    else{
      products.breadcrum = parent_check
    }
  }
  if(products.result === true){
      let children = await readHierarchy([{category_name:data[0].category_name}])
      for (let item in children){
        data.push(children[item])
      }
      let data_query = "select * from queryv2 where "
      for(let item in data){
        if(parseInt(item)+1 === data.length){
          data_query = data_query + `category_name like '${data[item].category_name}'`
        }
        else {
          data_query = data_query + `category_name like '${data[item].category_name}' OR `
        }
      }
      let product = await client.query(data_query)
      for(let value in product.rows){
        products.data.push(product.rows[value])
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
  const create_product = await createProduct(data.product_name, data.brand_id, data.description, data.category_id)
  if(create_product != 1){
    res.send(JSON.stringify({result:create_product}))
  }
  else{
    const productId = await client.query(`select product_id from products where product_name like '${data.product_name}'`)
    if(data.specs_keys.length > 0){
      for(let item in data.specs_keys){
          if(data.specs_keys[item].key.trim() !== "" && data.specs_keys[item].value.trim() !== ""){
              await client.query(`insert into specifications (product_id,key,value,unit) \
              values \
              (${productId.rows[0].product_id},'${data.specs_keys[item]['key']}','${data.specs_keys[item]['value']}','${data.specs_keys[item]['unit']}')`)
      }
    }
  }
    res.send(JSON.stringify({result:'success'}))
}
})

app.get('/api/edit-category/:value', async(req,res) => {
  const data = req.params.value
  let category_data = await readHierarchy([{category_name:data}])
  const parent_category = await client.query("select category_id, category_name from categories where category_name like $1",[data])
  category_data.push(parent_category.rows[0])
  const all_categories = await client.query("select category_id, category_name from categories")
  let result = all_categories.rows.filter(e => {
    return !category_data.find(data => data.category_id === e.category_id)});
  hierTree = []
  res.send(JSON.stringify(result))
})

app.post('/api/edit-category', async(req,res) => {
  let response = {result:'failure'}
  const data = req.body
  if (data.category_new_name.trim() === ""){
    response.result = 'failure'
  }
  else{
    try {
      let resp = await client.query(`update categories set category_name = '${data.category_new_name.replace(/\s+/g,' ').trim()}', parent_name = '${data.parent_new_name}',\
       slug = slugify('${data.category_new_name.replace(/\s+/g,' ').trim()}') where category_name like '${data.category_name}'`)
       if(resp.rowCount === 1){
         if(data.category_new_name.replace(/\s+/g,' ').trim() !== data.category_name.replace(/\s+/g,' ').trim()){
           let parent_name_change = await client.query(`update categories set parent_name = '${data.category_new_name.replace(/\s+/g,' ').trim()}'\
           where parent_name like '${data.category_name.replace(/\s+/g,' ').trim()}'`)
         }
         response.result = "success"
       }

    }
    catch(e){
      response.result = 'failure'
      console.log(e)
    }
  }
  res.send(JSON.stringify(response))
})

// Function to Read Products from Database
async function readProducts() {
    try {
    const results = await client.query("select product_id,product_name,brand_name,category_name,parent_name,slug from queryv2");
    return results.rows;
    }
    catch(e){
      console.log(e)
        return e;
    }
}


// Function to Create Brand
async function createBrand(brand_name) {
  try{
    const result = await client.query(`insert into brands (brand_name) values ('${brand_name.replace(/\s+/g,' ').trim()}')`)
    return result.rowCount
  }
  catch(e){
    return e.detail
  }
}

// Function to Create Category
async function createCategory(data) {
  try{
    const result = await client.query(`insert into categories (category_name, parent_name) values ('${data.category_name.replace(/\s+/g,' ').trim()}','${data.parent_name}')`)
    return result.rowCount
  }
  catch(e){
    return e.detail
  }
}

// Function to Read Full Product Data
async function readProductData(id){
  try{
    const result = await client.query(`select * from queryv2 where slug like '${id}'`)
    let spec
    let data = []
    if(result.rows.length == 0){
    data = [{product_data:[],specifications:[],product:false}]
  }
    else{
    spec = await client.query(`select key, value, unit from specifications where product_id = ${result.rows[0].product_id}`)
    data = [{product_data:result.rows,specifications:spec.rows,product:true}]
    }
    return data
  }
  catch(e){
    return e.detail
  }
}

// Function to get Hierarchy of Child to Parent
let array = []
let bread_array = []
async function readBreadcrum(cat_name){
  var result = ""
  try{
  const bread = await client.query(`select parent_name,category_name,slug from categories where category_name like \'${cat_name}\'`)
  bread_array.push(bread.rows[0].slug)
  array.push({category_name:bread.rows[0].category_name, link:''})
  if(bread.rows[0]['parent_name'] != ''){
    await readBreadcrum(bread.rows[0]['parent_name'])
  }

  }
  catch(e){
    console.log(e)
    return []
  }
  finally{
    let breads = []
    let item = ""
    for (let i=0;i<bread_array.length;i++){
      for(let j=bread_array.length-1;j>=i;j--){
        item = item.concat("/"+bread_array[j])
      }
      breads.push(item)
      item = ""
    }
    for (let value in array){
      array[value]['link'] = breads[value]
    }
    return Object.assign([],array).reverse()
  }
}

// Function to Fetch Hierarchy Category Data
let hierTree = []
let query = "select category_id, category_name from categories where "
async function readHierarchy(parent){
  try{
    let children
    if(parent.length === 1){
    children = await client.query(`select category_id, category_name from categories where parent_name like '${parent[0].category_name}'`)
    }
    else if(parent.length > 1){
      let inside_query = query
      for(let item in parent){
        if(parseInt(item)+1 === parent.length){
          inside_query = inside_query + `parent_name like '${parent[item].category_name}'`
        }
        else{
          inside_query = inside_query + `parent_name like '${parent[item].category_name}' OR `
        }
      }
      children = await client.query(`${inside_query}`)
    }
    if (children.rows.length !== 0){
      for (let item in children.rows){
      hierTree.push(children.rows[item])
    }
      await readHierarchy(children.rows)
    }

  }
  catch(e){
    console.log(e)
    return []
  }
  finally{
    return hierTree
  }
}

// Function to Create Product
async function createProduct(product_name, brand_id, description, category_id) {
  try{
    const result = await client.query(`insert into products (product_name,brand_id,description,category_id) \
    values \
    ('${product_name.replace(/\s+/g,' ').trim()}','${brand_id}','${description}','${category_id}')`)
    return result.rowCount
  }
  catch(e){
    console.log(e.detail)
    return e.detail
  }
}


app.listen(port, () => console.log(`Server started on port ${port}`));
