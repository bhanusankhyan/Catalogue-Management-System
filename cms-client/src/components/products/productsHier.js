import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import './products.css'

class ProductsHier extends React.Component {
  constructor() {
    super();
    this.state = {
          displayProducts: [],
          breadcrum : [],
          breadcrum_links : [],
          flag : false
    }
  }
  componentDidMount(){
    fetch(`/api/hier/${this.props.match.params[0]}`)
    .then(res => res.json())
    .then(data => {
      this.setState({displayProducts:data})
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
    })
  }

  onClick = (link) => {
  window.location.href=link
  }

  render() {
    return(
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
                  this.state.breadcrum_links.map(data=>
                    <li className="breadcrumb-item" aria-current="page" key={data.link}>
                      <Link onClick = {() => this.onClick(data.link)}>
                        {data.name}
                      </Link>
                    </li>)
                  }

                </ol>
            </nav>
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
                                  </div>
                                  </Link>
                              </div>
                            )
                      }
                </div>
            </div>
      </div>
    )
  }
}

export default ProductsHier;
