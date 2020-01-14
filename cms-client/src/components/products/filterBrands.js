import React from 'react';
import Select from 'react-select';


class FilterBrands extends React.Component {

  render(){
    return(
      <div className="mt-2">
      <Select
        value={this.props.selectedBrand}
        onChange={this.props.onBrandsChange}
        options={this.props.brands}
        isMulti = {true}
        placeholder= {"Select Brands"}
      />
      </div>
    )
  }
}

export default FilterBrands;
