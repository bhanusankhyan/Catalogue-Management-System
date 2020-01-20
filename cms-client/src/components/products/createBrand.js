import React from 'react';
import Modal from 'react-bootstrap/Modal';

class CreateBrand extends React.Component {
  constructor() {
    super();
    this.state = {
      modalShow : false,
      brandName : "",
    }
    this.handleBrandName = this.handleBrandName.bind(this);
    this.createBrand = this.createBrand.bind(this);
  }

  handleBrandName(e) {
    this.setState({brandName: e.target.value})
  }

  createBrand(e) {
    e.preventDefault();
    if(this.state.brandName.trim() !== ""){
    const brandData = [{brand_name: this.state.brandName}]
    fetch('/api/createbrand',{
      method : 'post',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(brandData)
    })
    .then(res => res.json())
    .then(data => {
      if(data[0].result === 1){
        this.setState({modalShow: false}, ()=> {
          alert("Brand Successfully Added")
          this.props.refreshList("brands");
        })

      }
      else{
        alert(data[0].result+" Please Try Again")
      }
    })
    }
    else{
      alert("Please Enter a Brand Name")
    }
  }

  render(){
    return (
      <span>
          <button className="btn btn-outline-dark ml-2" onClick={() => this.setState({modalShow :true})}>Create Brand</button>
          <Modal
        size="lg"
        show={this.state.modalShow}
        onHide={() => this.setState({modalShow : false})}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
              Create New Brand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="productName">Brand Name</label>
              <input type="text" className="form-control" placeholder="Brand Name" onChange = {this.handleBrandName} id="brandName" />
            </div>
          </div>
          <div className = "text-center mt-4">
            <button className = "btn btn-outline-dark" onClick={this.createBrand}> Create </button>
          </div>
        </form>
        </Modal.Body>
      </Modal>
      </span>
    )
  }
}

export default CreateBrand;
