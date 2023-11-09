import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTimes } from "../../../utils/utils";
import { mainApi } from "../../../utils/MainApi";

function MoviesCard({ movie, savedMovies, setSavedMoviesList }) {
  const location = useLocation();

  const [isSavedMovie, setIsSavedMovie] = useState(false);

  useEffect(() => {
    setIsSavedMovie(
      savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)
    );
  }, [savedMovies, movie.id]);

  function handleLikeClick(movie) {
    mainApi
      .saveMovie(movie)
      .then((movie) => {
        setIsSavedMovie(true);
        setSavedMoviesList([movie, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function handleMovieDelete(movie) {
    if (location.pathname === "/movies") {
      handleMovieDeleteById(movie.id);
    } else {
      handleMovieDeleteByMovieId(movie.movieId);
    }
  }

  function handleMovieDeleteById(id) {
    const removedMovie = savedMovies.find((item) => item.movieId === id);
    deleteMovie(removedMovie);
  }

  function handleMovieDeleteByMovieId(movieId) {
    const removedMovie = savedMovies.find((item) => item.movieId === movieId);
    deleteMovie(removedMovie);
  }

  function deleteMovie(removedMovie) {
    mainApi
      .deleteMovie(removedMovie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (savedMovie) => savedMovie.movieId !== removedMovie.movieId
        );
        setSavedMoviesList(newSavedMovies);
        setIsSavedMovie(false);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  const handleDelete = () => {
    handleMovieDelete(movie);
  };

  const handleLike = () => {
    if (isSavedMovie) {
      handleMovieDelete(movie);
    } else {
      handleLikeClick(movie);
    }
  };

  return (
    <li className="movies-card__item">
      <a href={movie.trailerLink} target="_blank">
        <img
          className="movies-card__image"
          src={
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={`Постер к фильму ${movie.nameRU}`}
        />
      </a>
      {location.pathname === "/movies" ? (
        <button
          className={`movies-card__button-img 
                ${
                  isSavedMovie
                    ? `movies-card__button-saved`
                    : `movies-card__button-save`
                }`}
          type="button"
          onClick={handleLike}
        ></button>
      ) : (
        <button
          className={`movies-card__button-img 
                movies-card__button-delete
                }`}
          type="button"
          onClick={handleDelete}
        ></button>
      )}
      <div className="movies-card__text-container">
        <h2 className="movies-card__name">{movie.nameRU}</h2>
        <p className="movies-card__time">{getTimes(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
