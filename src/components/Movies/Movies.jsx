import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { filterAllMovies, filterShortMovies } from "../../utils/utils";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({ savedMovies, setSavedMoviesList }) {
  const [count, setCount] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterAll, setFilterAll] = useState([]);
  const [checkboxFlag, setCheckboxFlag] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [requestStatus, setRequestStatus] = useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  function searchMovies(word) {
    localStorage.setItem("search-word", word);

    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      handleFilterMovies(movies, word);
    } else {
      fetchMovies(word);
    }
  }

  function fetchMovies(word) {
    setPreloader(true);

    moviesApi
      .getMovies()
      .then((cardsData) => {
        localStorage.setItem("movies", JSON.stringify(cardsData));
        handleFilterMovies(cardsData, word);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  function handleFilterMovies(moviesList, word, short) {
    const movies = filterAllMovies(moviesList, word);
    movies.length === 0 ? setRequestStatus(false) : setRequestStatus(true);
    setFilteredMovies(movies);
    setFilterAll(short ? filterShortMovies(movies) : movies);
    localStorage.setItem("filter-movies", JSON.stringify(movies));
    localStorage.setItem("search-word", word);
  }

  function getShortMovies() {
    setCheckboxFlag(!checkboxFlag);
    if (!checkboxFlag) {
      setFilterAll(filterShortMovies(filteredMovies));
    } else {
      setFilterAll(filteredMovies);
    }
    localStorage.setItem("checkbox", !checkboxFlag);
  }

  function getMoviesCount() {
    if (window.innerWidth >= 768) {
      setCount(12);
    } else if (window.innerWidth > 630) {
      setCount(8);
    } else if (window.innerWidth <= 630) {
      setCount(5);
    }
  }

  useEffect(() => {
    getMoviesCount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", getMoviesCount);
    }, 300);
  });

  useEffect(() => {
    if (localStorage.getItem("checkbox") === "true") {
      setCheckboxFlag(true);
    } else {
      setCheckboxFlag(false);
    }
  }, []);

  function showButtonMore() {
    const display = window.innerWidth;
    let increment = 0;

    if (display > 1047) {
      increment = 3;
    } else if (display > 613) {
      increment = 2;
    } else if (display < 613) {
      increment = 2;
    }

    setCount(count + increment);
  }

  const moviesList = filterAll.slice(0, count);

  useEffect(() => {
    if (localStorage.getItem("filter-movies")) {
      const movies = JSON.parse(localStorage.getItem("filter-movies"));
      setFilteredMovies(movies);
      movies.length === 0 ? setRequestStatus(false) : setRequestStatus(true);
      if (localStorage.getItem("checkbox") === "true") {
        setCheckboxFlag(true);
        setFilterAll(filterShortMovies(movies));
      } else {
        setCheckboxFlag(false);
        setFilterAll(movies);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("search-word")) {
      if (filterAll.length === 0) {
        setRequestStatus(false);
      } else {
        setRequestStatus(true);
      }
    } else {
      setRequestStatus(false);
    }
  }, [filterAll]);

  return (
    <>
      <main className="movies">
        <SearchForm
          searchMovies={searchMovies}
          onFilter={getShortMovies}
          checkboxStatus={checkboxFlag}
        />
        {requestStatus ? (
          <MoviesCardList
            preloader={preloader}
            savedMovies={savedMovies}
            setSavedMoviesList={setSavedMoviesList}
            movies={moviesList}
          />
        ) : errorMessage ? (
          <p className="movies__error">{errorMessage}</p>
        ) : (
          <p className="movies__error">Ничего не найдено!</p>
        )}
        {(count < filterAll.length) && (!errorMessage) && (
          <button
            type="button"
            onClick={showButtonMore}
            className="movies__more"
          >
            Ещё
          </button>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
