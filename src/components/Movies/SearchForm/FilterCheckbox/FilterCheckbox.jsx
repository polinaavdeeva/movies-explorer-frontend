import React from "react";
import './FilterCheckbox.css'

function FilterCheckbox () {
    return (
      <div className='filter-checkbox'>
          <input type='checkbox' id='switcher' className='filter-checkbox__input'/>
          <label className='filter-checkbox__label' for='switcher'></label>
          <p className='filter-checkbox__name'>Короткометражки</p>
      </div>
    );
  };
  
  export default FilterCheckbox;