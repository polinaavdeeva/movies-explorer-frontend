import React from "react";
import './SearchForm.css';
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm() {
    return(
        <section className="search-form">
            <form className="search-form__field">
                <span className="search-form__img"></span>
                <input type="text" className="search-form__input" placeholder="Фильм" required/>
                <button className="search-form__button" type="submit">
                    Найти
                </button>
                <FilterCheckbox/>
            </form>
        </section>
    )
}

export default SearchForm;