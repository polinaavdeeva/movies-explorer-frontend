import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HAVE_TO_KEYWORD } from "../../utils/constants";

function SearchForm({search, onSearch, isShort, onCheckbox, onChange}) {
  const {pathname} = useLocation();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabled(() => true);
    if (search.trim()) {
      onSearch(search, isShort)
    } else {
      setIsEmptySearch(true);
    }
    setIsDisabled(() => false);
  }

  function handleCheckbox(e) {
    setIsDisabled(() => true);
    if (pathname === "/saved-movies") {
      onCheckbox(e);
    }
    if (pathname === "/movies") {
      if (search.trim()) {
        onCheckbox(e)
      } else {
        setIsEmptySearch(true);
      }
    }
    setIsDisabled(() => false);
  }

  useEffect(() => {
    setIsEmptySearch(false)
  }, [search]);

  return (
    <section className="search-form">
      <form className="search-form__field" onSubmit={handleSubmit} noValidate>
        <span className="search-form__img"/>
        <input
          name="search"
          type="text"
          className="search-form__input"
          onChange={onChange}
          value={search || ""}
          placeholder="Фильм"
          required
          disabled={isDisabled}
        />
        <button className="search-form__button" type="submit">
          Найти
        </button>
        <FilterCheckbox onChange={handleCheckbox} isShort={isShort} disabled={isDisabled}/>
      </form>
      {isEmptySearch && (
        <span className="search-form__error">{HAVE_TO_KEYWORD}</span>
      )}
    </section>
  );
}

export default SearchForm;
