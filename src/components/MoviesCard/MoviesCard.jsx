import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getTimes } from "../../utils/utils";

function MoviesCard({movie, onLike, onDislike}) {
  const location = useLocation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const imagePath = location.pathname === "/movies" ? `https://api.nomoreparties.co${movie.image.url}` : movie.image

  async function handleLikeClick() {
    setIsButtonDisabled(() => true);
    await onLike(movie);
    setIsButtonDisabled(() => false);
  }

  async function handleMovieDelete() {
    setIsButtonDisabled(() => true);
    await onDislike(movie);
    setIsButtonDisabled(() => false);
  }

  function openTrailer() {
    window.open(movie.trailerLink, "_blank")
  }

  return (
    <li className="movies-card__item">
      <img
        className="movies-card__image"
        src={imagePath}
        alt={`Постер к фильму ${movie.nameRU}`}
        onClick={openTrailer}
      />
      {location.pathname === "/saved-movies"
        ?
        <button
          className="movies-card__button-img movies-card__button-delete"
          type="button"
          onClick={handleMovieDelete}
          disabled={isButtonDisabled}
        /> : movie.isSaved ?
          <button
            className="movies-card__button-img movies-card__button-saved"
            type="button"
            onClick={handleMovieDelete}
            disabled={isButtonDisabled}
          />
          :
          <button
            className="movies-card__button-img movies-card__button-save"
            type="button"
            onClick={handleLikeClick}
            disabled={isButtonDisabled}
          />
      }
      <div className="movies-card__text-container">
        <h2 className="movies-card__name">{movie.nameRU}</h2>
        <p className="movies-card__time">{getTimes(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
