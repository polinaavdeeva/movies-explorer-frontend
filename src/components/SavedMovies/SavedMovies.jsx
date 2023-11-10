import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "../Movies/Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAndUpdateMovies, filterAllMovies, updateLocalStorage } from "../../utils/utils";
import useSearchForm from "../../hooks/useSearchForm";
import Preloader from "../Preloader/Preloader";
import { NETWORK_ERROR } from "../../utils/constants";
import { mainApi } from "../../utils/MainApi";

function SavedMovies({savedMovies, setSavedMoviesList, sourceMovies, setSourceMovies}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [netErrorMsg, setNetErrorMsg] = useState(false);
  const {word, handleChange, handleShortChange, isShort} = useSearchForm();

  function handleFilterMovies(moviesList, word, short) {
    const movies = filterAllMovies(moviesList, word, short);
    setFilteredMovies(movies);
    if (movies.length === 0) {
      setIsEmptySearch(true);
    }
  }

  function searchMovies(word, short) {
    handleFilterMovies(savedMovies, word, short)
  }

  async function onShort(e) {
    await handleShortChange(e);
    await searchMovies(word, e.target.checked);
  }

  function dislikeMovie(movie) {
    return mainApi.deleteMovie(movie._id)
      .then(() => {
          const sourceMovie = sourceMovies.find(data => movie.movieId === data.id)
          sourceMovie.isSaved = false;
          setSourceMovies(p => p.map(data => (data.id === sourceMovie.id) ? sourceMovie : data));
          updateLocalStorage(sourceMovie);
          setFilteredMovies(p => p.filter(data => data.movieId !== movie.movieId));
          setSavedMoviesList(p => p.filter(data => data.movieId !== movie.movieId));
          if (filteredMovies.length <= 1) {
            setIsEmptySearch(true);
          }
        }
      )
      .catch(error => {
        console.log(error);
        setNetErrorMsg(true);
      });
  }

  useEffect(() => {
    setIsEmptySearch(false);
    setNetErrorMsg(false);
  }, [word, isShort]);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setFilteredMovies(savedMovies);
    } else {
      setFilteredMovies(savedMovies);
      if (sourceMovies.length === 0) {
        fetchAndUpdateMovies(setPreloader, setNetErrorMsg, sourceMovies, savedMovies)
          .then(data => setSourceMovies(data))
          .catch(error => console.log(error));
      }
    }
  }, [!!savedMovies.length])

  return (
    <>
      <main className="movies">
        <SearchForm
          onCheckbox={onShort}
          onSearch={searchMovies}
          onChange={handleChange}
          search={word}
          isShort={isShort}
        />
        {preloader ? <Preloader /> :
          filteredMovies &&
          <MoviesCardList movies={filteredMovies} onDislike={dislikeMovie} />
        }
        {netErrorMsg && <p className="movies__error">{NETWORK_ERROR}</p>}
        {isEmptySearch && <p className="movies__error">Ничего не найдено!</p>}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
