import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function MoviesCard({ movie }) {
  const [isMovieSaved, setMovieSaved] = useState(false);

  function handleMovieSaved() {
    setMovieSaved(!isMovieSaved);
  }

  let location = useLocation();

  return (
    <section className="movies-card">
      <li className="movies-card__item">
        <img
          className="movies-card__image"
          src={movie.thumbnail}
          alt="Постер к фильму"
        />
        <button
          className={`movies-card__button-img 
                ${
                  location.pathname === "/movies"
                    ? isMovieSaved
                      ? `movies-card__button-saved`
                      : `movies-card__button-save`
                    : `movies-card__button-delete`
                }`}
          type="button"
          onClick={handleMovieSaved}
        ></button>
        <div className="movies-card__text-container">
          <h2 className="movies-card__name">{movie.nameRU}</h2>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>
    </section>
  );
}

export default MoviesCard;
