import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './products.css';
import FilterBrands from './filterBrands';
import FilterCategories from './filterCategories';
import CreateProduct from './createProduct';
import CreateBrand from './createBrand';
import CreateCategory from './createCategory'


class Products extends Component {
  constructor() {
    super();
    this.state = {
      products : [],
      displayProducts: [],
      brandFilter: [],
      categoryFilter: [],
      selectedBrand : null,
      CategoryFilter: [],
      selectedCategory: null,
      filter:[
        {brands:[]},
        {categories:[]}
      ]

    }
    this.onBrandsChange = this.onBrandsChange.bind(this)
    this.handleFilters = this.handleFilters.bind(this)
  }
  componentDidMount(){
    fetch('/api/products')
      .then(res => res.json())
      .then(products => {
        this.setState({products})
        this.setState({displayProducts : products})
        let brands = []
        let categories = []
        for (let item in products){
          brands.push({label:products[item]['brand_name'], value: products[item]['brand_name']})
          categories.push({label:products[item]['category_name'], value: products[item]['category_name']})
        }
        let filtered_brands = [...new Map(brands.map(obj => [JSON.stringify(obj), obj])).values()];
        let filtered_categories = [...new Map(categories.map(obj => [JSON.stringify(obj), obj])).values()];
        this.setState({brandFilter : filtered_brands})
        this.setState({categoryFilter: filtered_categories})
      })
      var elements = document.getElementsByClassName('css-1hb7zxy-IndicatorsContainer')
      while (elements.length > 0) elements[0].remove();
  }
  onBrandsChange = selectedBrand => {
    var filter = this.state.filter
    filter[0].brands = selectedBrand
    filter[1].categories = this.state.selectedCategory
    this.setState({filter:filter})
    this.setState(
      { selectedBrand },
      () => {
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
      }
    );


  };

  onCategoryChange = selectedCategory => {
    if(this.state.selectedBrand == null && this.state.selectedCategory == null){
      this.setState({displayProducts:this.state.products})
    }
    var filter = this.state.filter
    filter[0].brands = this.state.selectedBrand
    filter[1].categories = selectedCategory
    this.setState({filter:filter},
    () => {
      fetch('/api/product_listing',{
        method : 'post',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(this.state.filter)
      })
      .then(res => res.json())
      .then(data => {
        this.setState({displayProducts:data}, () => {
        if(this.state.selectedBrand == null && this.state.selectedCategory == null){
          this.setState({displayProducts:this.state.products})
        }
        })
      })
      })
    this.setState(
      {selectedCategory})
  }

  handleFilters(){
    this.setState({displayProducts:this.state.products})
    this.setState({selectedBrand: null})
    this.setState({selectedCategory: null})
  }


  render(){
    return(
      <div className= "container">
          <div className = "head">
              <h2 className="text-center">Products</h2>
          </div>
          <div className="mb-3 form-group ">
            <CreateProduct />
            <CreateBrand />
            <CreateCategory />
          </div>
          <div className="row m-1">
              <div className="col-lg-3">
                  <div className="card">
                      <h6 className="text-center">Filter By</h6>
                  </div>
                  <FilterBrands brands = {this.state.brandFilter} selectedBrand = {this.state.selectedBrand} onBrandsChange = {this.onBrandsChange}/>
                  <FilterCategories categories = {this.state.categoryFilter} selectedCategory = {this.state.selectedCategory} onCategoryChange = {this.onCategoryChange}/>
                  <button className="btn btn-outline-dark mt-2" onClick={this.handleFilters}>
                      Reset Filters
                  </button>
              </div>
              <div className="col-lg-9">
                  <div className="row">
                      {
                          this.state.displayProducts.map(product =>
                              <div className = "col-lg-6 mb-3 text-center" key={product.product_id}>
                                <Link className='link' to={`/product/${product.product_id}`}>
                                  <div className="card">
                                    <div className="card-header">
                                        <h5>{product.product_name}</h5>
                                    </div>
                                    Brand : {product.brand_name}
                                    <br />
                                    Category : {product.category_name}
                                    <br />
                                  </div>
                                </Link>
                              </div>
                            )
                      }
                  </div>
                </div>
          </div>
      </div>
    )
  }
}

export default Products;
