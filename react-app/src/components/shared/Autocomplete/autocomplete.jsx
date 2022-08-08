import React from 'react'
import Select from 'react-select';

const Autocomplete = (props) => {
  return (
        <div id="autocomplete" style={{minWidth:'20rem'}} >
          <Select options={props.options} 
            defaultValue={props.selectedBook!=null ? props.selectedBook : props.options[0]} 
            onChange={(e)=>{ props.handleBookFilter(e.value) }}/>
        </div>
    );
} 

export default Autocomplete;