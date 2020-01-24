import React from 'react';
import Modal from 'react-bootstrap/Modal';

class EditCategory extends React.Component {
  constructor() {
    super()
    this.state = {
      modalShow: false,
      categoryData: [],
      categoryName: "",
      changeParent: [],
      changedParentname:"",
      categoryChangedName: "",
      showChange: false
    }
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onCategoryNameChange = this.onCategoryNameChange.bind(this)
    this.onParentChange = this.onParentChange.bind(this)
    this.onEditCategory = this.onEditCategory.bind(this)
    this.onShowModal = this.onShowModal.bind(this)
    this.onHideModal = this.onHideModal.bind(this)
  }

  onShowModal() {
    this.setState({modalShow:true})
    fetch('/api/select-category')
    .then(res => res.json())
    .then(data => {
      this.setState({categoryData : data})
    })
  }

  onHideModal(){
    this.setState({modalShow: false})
    this.setState({changeParent:[]})
    this.setState({showChange: false})
  }

  onCategoryChange(e){
    this.setState({categoryName:e.target.value})
    this.setState({categoryChangedName:e.target.value})
    fetch(`/api/edit-category/${e.target.value}`)
    .then(res => res.json())
    .then(data =>{
      this.setState({changeParent:data})
      this.setState({showChange:true})
    })
  }

  onEditCategory(e) {
      e.preventDefault();
      fetch('/api/edit-category', {
        method : 'post',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({category_name:this.state.categoryName, category_new_name:this.state.categoryChangedName.replace(/\s+/g,' ').trim(), parent_new_name: this.state.changedParentname})
      })
      .then(res => res.json())
      .then(data => {
        if(data.result === 'success'){
          this.setState({modalShow:false})
          alert("Changes Saved")
          window.location.href = '/'
        }
        else{
          alert("Please Try Again")
        }
      })
  }

  onCategoryNameChange(e) {
    this.setState({categoryChangedName: e.target.value})
  }

  onParentChange(e){
    this.setState({changedParentname:e.target.value})
  }

  render() {
    return(
      <span>
          <button className="btn btn-outline-dark ml-2" onClick={this.onShowModal}>Edit Category</button>
          <Modal
        size="lg"
        show={this.state.modalShow}
        onHide={this.onHideModal}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
              Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        <div className="row">
        <div className="col-md-12">
          <label htmlFor="selectCategory">Category Name</label>
          <select className="form-control" id="selectCategory" onChange={this.onCategoryChange}>
                <option value="">None</option>
            {
              this.state.categoryData.map(data =>
                <option value={data.category_name} key={data.category_id}>{data.category_name}</option>
              )
            }
          </select>
        </div>
        </div>
        <br />
        {
          this.state.showChange ?
          <span>
          <div className="row">
          <div className="col-md-6">
            <label htmlFor="productName">Category New Name</label>
            <input type="text" className="form-control" name="productName" onChange={this.onCategoryNameChange} value={this.state.categoryChangedName} id="productName" />
          </div>
          <div className="col-md-6">
            <label htmlFor="selectParent">Select New Parent</label>
            <select name="parent" className="form-control" onChange={this.onParentChange} id="selectParent">
              <option value="">None</option>
              {
                this.state.changeParent.map(data =>
                  <option value={data.category_name} key={data.category_id}>{data.category_name}</option>
                )
              }
            </select>
          </div>
          <br />
          </div>
            <div className="mt-3 text-center">
              <button className = "btn btn-outline-dark" onClick={this.onEditCategory}> Save Changes </button>
            </div>
          </span>:
          <div />
        }
        </form>
        </Modal.Body>
      </Modal>
      </span>
    )
  }
}

export default EditCategory;
