import React from 'react';
import Modal from 'react-bootstrap/Modal';

class CreateCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      modalShow : false,
      parentCategoryData : [],
      categoryName : "",
      parentCategory : ""
    }
    this.showModal = this.showModal.bind(this);
    this.handleParentCategory = this.handleParentCategory.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.handleCategoryName = this.handleCategoryName.bind(this);
  }

showModal() {
  this.setState({modalShow : true})
  fetch('/api/select-category')
  .then(res => res.json())
  .then(data => this.setState({parentCategoryData : data}))
}

handleParentCategory(e) {
  this.setState({parentCategory : e.target.value})
}

createCategory(e) {
  e.preventDefault()
  if(this.state.categoryName.trim() !== ''){
  const categoryData = [{category_name : this.state.categoryName, parent_name : this.state.parentCategory}]
  fetch('/api/create-category', {
    method : 'post',
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(categoryData)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if (data[0].result == 1){
      alert("Category created Successfully!!")
      this.setState({modalShow:false})
    }
    else{
      alert(data[0].result+" Please Try Again")
    }
  })
}
else{
  alert("Please enter Category Name")
}
}

handleCategoryName(e) {
  this.setState({categoryName : e.target.value})
}

  render(){

    return(
      <span>
          <button className="btn btn-outline-dark ml-2" onClick = {this.showModal}>Create Category</button>
          <Modal
        size="lg"
        show={this.state.modalShow}
        onHide={() => this.setState({modalShow : false})}
        aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
              Create New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <div className="row">
            <div className="col">
              <label htmlFor="categoryName">Category Name</label>
              <input type="text" className="form-control" placeholder="Category Name" onChange = {this.handleCategoryName} id="categoryName" />
            </div>
            <div className="col">
              <label htmlFor="selectParent">Parent Category Name</label>
              <select className="form-control" id="selectParent" onChange={this.handleParentCategory}>
                    <option value="">None</option>
                {
                  this.state.parentCategoryData.map(data =>
                    <option value={data.category_name}>{data.category_name}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className = "text-center mt-4">
            <button className = "btn btn-outline-dark" onClick={this.createCategory}> Create </button>
          </div>
        </form>
        </Modal.Body>
      </Modal>
      </span>
    )
  }
}

export default CreateCategory;
