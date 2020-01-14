import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      productCheck : false,
      productData : [],
      specifications : [],
      breadcrum : [],
      breadcrum_links :[]
    }
  }


  componentDidMount() {
    fetch(`/api/product/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({productData: data[0]['product_data']})
      this.setState({specifications: data[0]['specifications']})
      if(data[0]['product'] == true){
        this.setState({productCheck : true})
        this.setState({breadcrum : data[0]['breadcrum']})
        let breadcrum = data[0].breadcrum.slice(1).split("/")
        let breadcrum_link = data[0].breadcrum.slice(1)
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
        this.setState({breadcrum_links:links}, ()=>{
        })
      }

    })
  }



  render() {
    const productData = this.state.productData[0]
    return(
      <div className="container">
      {
        this.state.productCheck == true ?
        <div className="mt-5">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item" aria-current="page" >
              <Link to={'/products'}>
                Home
              </Link>
            </li>
            {
              this.state.breadcrum_links.map(data=>
              <li className="breadcrumb-item" aria-current="page" key={data.link} >
                  <Link to={data.link} >
                      {data.name}
                  </Link>
              </li>)
            }
              <li className="breadcrumb-item" aria-current="page">{productData.product_name}</li>
            </ol>
        </nav>
        <div className= "card mt-5">
            <div className="card-header text-center">
                <h1>{productData.product_name}</h1>
            </div>
            <div className="card-body">
                <div className="text-center">
                    Brand : {productData.brand_name}
                    <br />
                    Category : {productData.category_name}
                    <br />
                    Parent Name : {productData.parent_name}
                    <br /><br />
                    <h5>Specifications</h5>
                    {this.state.specifications.map(data =>
                        <div key={data.key}>{data.key} : {data.value} {data.unit}</div>
                    )}
                </div>
            </div>
            <div className="card-footer">
                <h5 className="text-center">Descripton</h5>
                <div className="row d-flex justify-content-center">
                    <div className=" col-lg-4">
                        {productData.description}
                    </div>
                </div>
            </div>
        </div>
        </div> :
        <h1>
            Page Not Found
        </h1>
      }
      </div>
    )
  }
}

export default ProductPage
