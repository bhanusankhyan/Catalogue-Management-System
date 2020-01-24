import React from 'react';
import {Link} from 'react-router-dom'

class ProductCard extends React.Component{
  render() {
    return(
      <div className="row">
          {
              this.props.products.map(product =>
                  <div className = "col-lg-4 mb-3 text-center" key={product.product_id}>
                    <Link className="link" to={`/product/${product.slug}`} >
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
    )
  }
}

export default ProductCard
