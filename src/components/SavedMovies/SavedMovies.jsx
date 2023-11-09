import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import "../Movies/Movies.css";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { filterAllMovies, filterShortMovies } from "../../utils/utils";

function SavedMovies({ savedMovies, setSavedMoviesList }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [filterAll, setFilterAll] = useState(savedMovies);
  const [shortMovies, setShortMovies] = useState(true);
  const [requestStatus, setRequestStatus] = useState(true);
  const [searchWord, setSearchWord] = useState("");

  function searchMovies(word, short) {
    const movies = filterAllMovies(savedMovies, word);
    setFilteredMovies(movies);
    setSearchWord(word);
    setFilterAll(short ? filterShortMovies(movies) : movies);
  }

  const handleMovies = () => {
    setShortMovies(!shortMovies);
    const moviesToFilter = shortMovies
      ? filterShortMovies(filteredMovies)
      : filteredMovies;
    setFilterAll(moviesToFilter);
  };

  useEffect(() => {
    setFilterAll(savedMovies);
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    setRequestStatus(filterAll.length > 0);
  }, [filterAll]);

  return (
    <>
      <main className="movies">
        <SearchForm
          searchMovies={searchMovies}
          onFilter={handleMovies}
          shortMovies={shortMovies}
        />
        {requestStatus ? (
          <MoviesCardList
            movies={filterAll}
            savedMovies={savedMovies}
            setSavedMoviesList={setSavedMoviesList}
          />
        ) : (
          <p className="movies__error">Ничего не найдено!</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
