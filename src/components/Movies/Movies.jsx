import React, { useLayoutEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAndUpdateMovies, filterAllMovies, updateLocalStorage } from "../../utils/utils";
import {
  CARD_LAPTOP,
  CARD_LAPTOP_MORE,
  CARD_TABLET, CHECKBOX,
  COUNT_MOBILE,
  COUNT_MOVIES_MOBILE_MORE,
  COUNT_MOVIES_TABLET_MORE,
  LAPTOP_RESOLUTION, MOVIES,
  NETWORK_ERROR, SEARCH,
  TABLET_RESOLUTION
} from "../../utils/constants";
import Preloader from "../Preloader/Preloader";
import useSearchForm from "../../hooks/useSearchForm";
import { mainApi } from "../../utils/MainApi";

function Movies({savedMovies, setSavedMoviesList, sourceMovies, setSourceMovies}) {
  const [count, setCount] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [isMorePresent, setIsMorePresent] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [netErrorMsg, setNetErrorMsg] = useState(false);
  const [windowMode, setWindowMode] = useState({init: CARD_LAPTOP, more: CARD_LAPTOP_MORE});
  const {word, setWord, handleChange, handleShortChange, isShort, setIsShort} = useSearchForm();

  const getMoviesCount = () => {
    if (window.innerWidth <= TABLET_RESOLUTION) {
      setWindowMode({init: COUNT_MOBILE, more: COUNT_MOVIES_MOBILE_MORE});
    } else if (window.innerWidth > TABLET_RESOLUTION && window.innerWidth <= LAPTOP_RESOLUTION) {
      setWindowMode({init: CARD_TABLET, more: COUNT_MOVIES_TABLET_MORE});
    } else {
      setWindowMode({init: CARD_LAPTOP, more: CARD_LAPTOP_MORE});
    }
  }

  useLayoutEffect(() => {
    getMoviesCount();
    window.addEventListener('resize', getMoviesCount);
    return () => {
      window.removeEventListener('resize', getMoviesCount);
    };
  }, [])

  function showButtonMore() {
    const newCount = count + windowMode.more;
    if (newCount < filteredMovies.length) {
      setCount(newCount);
      setIsMorePresent(true);
    } else if (count < filteredMovies.length) {
      setCount(newCount);
      setIsMorePresent(false);
    } else {
      setIsMorePresent(false);
    }
  }

  function searchMovies(word, short) {
    if (sourceMovies.length === 0) {
      fetchAndUpdateMovies(setPreloader, setNetErrorMsg, sourceMovies, savedMovies)
        .then(data => {
          setSourceMovies(data);
          handleFilterMovies(data, word, short);
        })
        .catch(error => console.log(error));
    } else {
      handleFilterMovies(sourceMovies, word, short);
    }
  }

  async function onShort(e) {
    await handleShortChange(e);
    await searchMovies(word, e.target.checked);
  }

  function handleFilterMovies(moviesList, word, short) {
    const movies = filterAllMovies(moviesList, word, short);
    localStorage.setItem(SEARCH, JSON.stringify(word));
    localStorage.setItem(CHECKBOX, JSON.stringify(short));
    localStorage.setItem(MOVIES, JSON.stringify(moviesList));
    setFilteredMovies(movies);
    setIsMorePresent(movies.length > windowMode.init);
    if (movies.length === 0) {
      setIsEmptySearch(true);
    }
  }

  function toggleActions(movie) {
    setSourceMovies(p => p.map(data => (data.id === movie.id) ? movie : data));
    setFilteredMovies(p => p.map(data => (data.id === movie.id) ? movie : data));
    updateLocalStorage(movie);
  }

  function likeMovie(movie) {
    return mainApi.saveMovie(movie)
      .then(newSavedMovie => {
        movie._id = newSavedMovie["_id"]
        movie.isSaved = true;
        toggleActions(movie);
        setSavedMoviesList(p => [...p, newSavedMovie]);
      })
      .catch(error => {
        console.log(error);
        setNetErrorMsg(true);
      })
  }

  function dislikeMovie(movie) {
    return mainApi.deleteMovie(movie._id)
      .then(() => {
        movie.isSaved = false;
        toggleActions(movie);
        setSavedMoviesList(p => p.filter(data => data.movieId !== movie.id));
      })
      .catch(error => {
        console.log(error);
        setNetErrorMsg(true);
      })
  }

  useEffect(() => {
    setIsEmptySearch(false);
    setNetErrorMsg(false);
  }, [word, isShort]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem(MOVIES));
    const word = JSON.parse(localStorage.getItem(SEARCH));
    const short = localStorage.getItem(CHECKBOX);
    if (word && short && movies) {
      setIsShort(JSON.parse(short));
      setWord(word);
      handleFilterMovies(movies, word, JSON.parse(short))
    }
    setCount(windowMode.init);
  }, [windowMode.init]);

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
          <MoviesCardList movies={filteredMovies.slice(0, count)} onLike={likeMovie} onDislike={dislikeMovie} />
        }
        {netErrorMsg && <p className="movies__error">{NETWORK_ERROR}</p>}
        {isEmptySearch && <p className="movies__error">Ничего не найдено!</p>}
        {isMorePresent && <button type="button" onClick={showButtonMore} className="movies__more">Ещё</button>}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
