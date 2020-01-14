import React from "react";
import Modal from 'react-bootstrap/Modal';


class CreateProduct extends React.Component {
  constructor(){
    super()
    this.state = {
        modalShow : false,
        productName : "",
        brandID : "",
        categoryID : "",
        specsKeys : [{key:'',value:'',unit:''}],
        brands:[],
        categories:[],
        description: ""
    }
    this.onShowModal = this.onShowModal.bind(this);
    this.onHideModal = this.onHideModal.bind(this)
    this.addSpecifications = this.addSpecifications.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  onShowModal(){
    fetch('/api/select-category')
    .then(res => res.json())
    .then(data => this.setState({categories:data}, ()=>{
      this.setState({categoryID:this.state.categories[0]['category_id']})
    }))
    fetch('/api/brands')
    .then(res => res.json())
    .then(data => this.setState({brands: data},() => {
      this.setState({brandID : this.state.brands[0]['brand_id']})
    }))
    this.setState({modalShow:true})

  }




  onHideModal(){
    this.setState({modalShow : false})
    this.setState({productName: ""})
    this.setState({specsKeys: [{key:'',value:'',unit:''}]})
  }

  addSpecifications(){
    this.setState((prevState) => ({
      specsKeys: [...prevState.specsKeys, {key:"", value:"",unit:""}],
    }));
  }

  handleSubmit = (e) => {
    const product = [{product_name:this.state.productName,brand_id:this.state.brandID,
      category_id:this.state.categoryID,specs_keys:this.state.specsKeys,description:this.state.description}]
    e.preventDefault()
    fetch('/api/create-product',{
      method : 'post',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(product) }
    )
    .then(res => res.json())
    .then(data => {
      if(data.result == 'success'){
        alert("Product Created Successfully")
        this.setState({modalShow : false})
      }
      else{
        alert(data.result+" Please Try Again")
      }
    })
  }

  handleChange = (e) => {
      if (["key", "value", "unit"].includes(e.target.className) ) {
        let specsKeys = [...this.state.specsKeys]
        specsKeys[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({ specsKeys })
      } else {
        this.setState({ [e.target.name]: e.target.value })
      }
    }



  render() {

    let {productName, specsKeys} = this.state
    return(
      <span>
          <button className="btn btn-outline-dark" onClick={this.onShowModal}>Create Product</button>
          <Modal
        size="lg"
        show={this.state.modalShow}
        onHide={this.onHideModal}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
              Create New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row">
            <div className="col">
              <label htmlFor="productName">Product Name</label>
              <input type="text" className="form-control" placeholder="Product Name" name="productName" value={productName} id="productName" />
            </div>
            <div className="col">
              <label htmlFor="selectBrand">Brand Name</label>
              <select name="brandID" className="form-control" id="selectBrand">
                {
                  this.state.brands.map(data =>
                    <option value={data.brand_id} key={data.brand_id}>{data.brand_name}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label htmlFor="selectCategory">Category Name</label>
              <select name="categoryID" className="form-control" id="selectCategory">
                {
                  this.state.categories.map(data =>
                    <option value={data.category_id} key={data.category_id}>{data.category_name}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className="text-center mt-4">
            <h4>Specifications <button type="button" className="btn btn-outline-dark" onClick={this.addSpecifications}> Add + </button> </h4>
          </div>

          {
            specsKeys.map((val, idx) => {
              let keyId = `key-${idx}`, valueId = `value-${idx}`, unitId = `unit-${idx}`
              return(
                <div className="form-row mt-4" key={idx}>
                <div className="form-group col-md-4">
                  <input type="text" placeholder="Key" className="key" data-id={idx} value={specsKeys[idx].key} name={keyId} id={keyId} />
                </div>
                <div className="form-group col-md-4">
                  <input type="text" placeholder="Value" className="value" id={valueId} value={specsKeys[idx].value} name={valueId} data-id={idx}/>
                </div>
                <div className="form-group col-md-4">
                  <input type="text" placeholder="Unit" className="unit" id={unitId} value={specsKeys[idx].unit} name={unitId} data-id={idx} />
                </div>
                </div>
              )
            })
          }
          <div className="form-group mt-4">
              <label htmlFor="productDescription">Product Description</label>
              <textarea name="description" className="form-control" id="productDescription" rows="3" />
          </div>
          <div className="mt-3 text-center">
              <button type="submit" className="btn btn-outline-dark"> Create </button>
          </div>
        </form>
        </Modal.Body>
      </Modal>
      </span>
    )
  }

}


export default CreateProduct
