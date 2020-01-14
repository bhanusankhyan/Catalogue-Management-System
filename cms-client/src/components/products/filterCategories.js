import React from 'react';
import Select from 'react-select';


class FilterCategories extends React.Component {

  render(){
    return(
      <div className="mt-2">
      <Select
        value={this.props.selectedCategory}
        onChange={this.props.onCategoryChange}
        options={this.props.categories}
        isMulti = {true}
        placeholder= {"Select Categories"}
      />
      </div>
    )
  }
}

export default FilterCategories;
