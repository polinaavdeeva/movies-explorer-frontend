import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ onFilter, checkboxStatus }) {
  return (
    <div className="filter-checkbox">
      <input
        type="checkbox"
        id="switcher"
        className="filter-checkbox__input"
        onChange={onFilter}
        checked={checkboxStatus}
      />
      <label className="filter-checkbox__label" htmlFor="switcher"></label>
      <p className="filter-checkbox__name">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
