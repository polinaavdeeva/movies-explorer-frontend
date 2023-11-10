import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ onChange,isShort,disabled}) {
  return (
    <div className="filter-checkbox">
      <input
        type="checkbox"
        id="switcher"
        className="filter-checkbox__input"
        onChange={onChange}
        checked={isShort}
        disabled={disabled}
      />
      <label className="filter-checkbox__label" htmlFor="switcher"></label>
      <p className="filter-checkbox__name">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
