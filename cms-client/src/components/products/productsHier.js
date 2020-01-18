import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './products.css';
import FilterBrands from './filterBrands';
import FilterCategories from './filterCategories';
import PageNotFound from '../../404'

class ProductsHier extends React.Component {
  constructor() {
    super();
    this.state = {
          products : [],
          displayProducts: [],
          breadcrum : [],
          breadcrum_links : [],
          flag : false,
          brandFilter: [],
          categoryFilter: [],
          selectedBrand: null,
          selectedCategory: null,
          filter:[
            {brands:[]},
            {categories:[]}
          ],
          hierCheck : true
    }
  }
  componentDidMount(){
    fetch(`/api/hier/${this.props.match.params[0]}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.result === true){
      this.setState({hierCheck:true})
      this.setState({displayProducts:data.data})
      this.setState({products: data.data})
      let link_data = this.props.match.params[0]
      if(link_data.charAt(link_data.length-1) == '/'){
        link_data = link_data.slice(0,-1)
      }
      let breadcrum = link_data.split("/")
      let breadcrum_link = link_data
      let parent_link = "/products/"
      let links = []
      for(let i=0;i< breadcrum.length;i++){
        if(breadcrum.length == 1){
          links.push({"name" :breadcrum[i], "link": parent_link.concat(breadcrum[i].replace(/ /g,"-"))})
        }
        else{
        links.push({"name" :breadcrum[i], "link": parent_link.concat(breadcrum_link.substring(0,breadcrum_link.indexOf(breadcrum[i])).concat(breadcrum[i])).replace(/ /g, "-")})


      }
      }
      this.setState({breadcrum_links:links})
      let brands = []
      let categories = []
      let products = this.state.products
      for (let item in products){
        brands.push({label:products[item]['brand_name'], value: products[item]['brand_name']})
        categories.push({label:products[item]['category_name'], value: products[item]['category_name']})
      }
      let filtered_brands = [...new Map(brands.map(obj => [JSON.stringify(obj), obj])).values()];
      let filtered_categories = [...new Map(categories.map(obj => [JSON.stringify(obj), obj])).values()];
      this.setState({brandFilter : filtered_brands})
      this.setState({categoryFilter: filtered_categories})

    var elements = document.getElementsByClassName('css-1hb7zxy-IndicatorsContainer')
    while (elements.length > 0) elements[0].remove();
  }
  else{
    this.setState({hierCheck: false})
  }
  })


  }

  onBrandsChange = selectedBrand => {
    this.setState(
      { selectedBrand },
      () => this.dataChange()
    );
  }

  onCategoryChange = selectedCategory => {
      this.setState({selectedCategory}, ()=> {
        this.dataChange()
      })
    }

dataChange() {
  var filter = this.state.filter
  filter[0].brands = this.state.selectedBrand
  filter[1].categories = this.state.selectedCategory
  if(filter[1].categories == null){
    filter[1].categories = this.state.categoryFilter
  }
  else if(filter[0].brands == null){
    filter[0].brands = this.state.brandFilter
  }
  else if(filter[0].brands == null && filter[1].categories == null){
    this.setState({displayProducts:this.state.products})
  }
  else{
    filter[0].brands = this.state.selectedBrand
    filter[1].categories = this.state.selectedCategory
  }
  this.setState({filter}, () => {
    fetch('/api/product_listing',{
      method : 'post',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(this.state.filter)
    })
    .then(res => res.json())
    .then(data => this.setState({displayProducts: data}, () => {
    if(this.state.selectedBrand == null && this.state.selectedCategory == null){
      this.setState({displayProducts:this.state.products})
    }

    }))
  })

}



  handleFilters(){
    this.setState({displayProducts:this.state.products})
    this.setState({selectedBrand: null})
    this.setState({selectedCategory: null})
  }

  onClick = (link) => {
  window.location.href=link
  }

  render() {
    //console.log(this.state.breadcrum_links.length)
    return(
      <div>
      { this.state.hierCheck === true ?
      <div className= "container">
        <div className="mt-5">
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
              <li className="breadcrumb-item" aria-current="page" >
                <Link onClick = {() => this.onClick("/products")}>
                  Home
                </Link>
              </li>
                {
                  this.state.breadcrum_links.map((data,index)=>{
                    return(
                    <li className="breadcrumb-item" aria-current="page" key={data.link}>
                      { this.state.breadcrum_links.length -1 !== index ?
                        <Link onClick = {() => this.onClick(data.link)}>
                        {data.name}
                      </Link> :
                       <span>{data.name} </span>
                    }
                    </li>
                  )})
                  }

                </ol>
            </nav>
            <div className = "row">
            <div className="col-lg-3">
                <div className="card">
                    <h6 className="text-center">Filter By</h6>
                </div>
                <FilterBrands brands = {this.state.brandFilter} selectedBrand = {this.state.selectedBrand} onBrandsChange = {this.onBrandsChange}/>
                <FilterCategories categories = {this.state.categoryFilter} selectedCategory = {this.state.selectedCategory} onCategoryChange = {this.onCategoryChange}/>
                <button className="btn btn-outline-dark mt-2" onClick={this.handleFilters.bind(this)}>
                    Reset Filters
                </button>
            </div>

                  <div className="col-lg-9">
                  <div className="row">
                      {
                          this.state.displayProducts.map(product =>
                              <div className = "col-lg-4 mb-3 text-center" key={product.product_id}>
                                <Link className="link" to={`/product/${product.product_id}`} >
                                  <div className="card">
                                    <div className="card-header">
                                        <h5>{product.product_name}</h5>
                                    </div>
                                    Brand : {product.brand_name}
                                    <br />
                                    Category : {product.category_name}
                                    <br />
                                    Parent Category : {product.parent_name}
                                  </div>
                                  </Link>
                              </div>
                            )
                      }
                    </div>
                </div>
                </div>
            </div>
      </div> :
      <PageNotFound />
      }
      </div>
    )
  }
}

export default ProductsHier;
