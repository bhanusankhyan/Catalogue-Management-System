import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './products.css';
import Filter from './filter';
import CreateProduct from './createProduct';
import CreateBrand from './createBrand';
import CreateCategory from './createCategory';
import ProductCard from './productCard';


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
      })
    fetch('api/select-category')
      .then(res => res.json())
      .then(data => {
        console.log(data.status)
        let categories = []
        for (let item in data){
          categories.push({label:data[item].category_name, value:data[item].category_name})
        }
        let filtered_categories = [...new Map(categories.map(obj => [JSON.stringify(obj), obj])).values()];
        this.setState({categoryFilter: categories})
      })
      fetch('/api/brands')
      .then(res => res.json())
      .then(data => {
        let brands = []
        for(let item in data){
            brands.push({label:data[item].brand_name, value:data[item].brand_name})
        }
        this.setState({brandFilter: brands})
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
                  <Filter value = {this.state.brandFilter} selectedItem = {this.state.selectedBrand} onChange = {this.onBrandsChange} placeholder = {"Select Brands"}/>
                  <Filter value = {this.state.categoryFilter} selectedItem = {this.state.selectedCategory} onChange = {this.onCategoryChange} placeholder = {"Select Categories"}/>
                  <button className="btn btn-outline-dark mt-2" onClick={this.handleFilters}>
                      Reset Filters
                  </button>
              </div>
              <div className="col-lg-9">
                  <ProductCard products={this.state.displayProducts} />
                </div>
          </div>
      </div>
    )
  }
}

export default Products;
