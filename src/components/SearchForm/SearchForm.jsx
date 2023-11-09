import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function SearchForm({ searchMovies, onFilter, checkboxStatus }) {
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState(
    location.pathname === "/movies"
      ? localStorage.getItem("search-word") 
      : ""
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.currentTarget.value);
    setError("")
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (searchQuery.length === 0) {
      setError("Нужно ввести ключевое слово");
      return;
    }

    searchMovies(searchQuery);
  }

  useEffect(() => {
    if (location.pathname === "/movies") {
      const storedSearchTerm = localStorage.getItem("search-word");
      setSearchQuery(storedSearchTerm || "");
    }
  }, [location.pathname]);

  return (
    <section className="search-form">
      <form className="search-form__field" onSubmit={handleSubmit} noValidate>
        <span className="search-form__img"></span>
        <input
          type="text"
          className="search-form__input"
          onChange={handleChange}
          value={searchQuery || ""}
          placeholder="Фильм"
          required
        />
        <button className="search-form__button" type="submit">
          Найти
        </button>
        <FilterCheckbox onFilter={onFilter} checkboxStatus={checkboxStatus} />
      </form>
      {error && (
        <span className="search-form__error">{error}</span>
      )}
    </section>
  );
}

export default SearchForm;
