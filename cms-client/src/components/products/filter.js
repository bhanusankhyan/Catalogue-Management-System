import React from 'react';
import Select from 'react-select';


class Filter extends React.Component {

  render(){
    return(
      <div className="mt-2">
      <Select
        value={this.props.selectedItem}
        onChange={this.props.onChange}
        options={this.props.value}
        isMulti = {true}
        placeholder= {this.props.placeholder}
      />
      </div>
    )
  }
}

export default Filter;
