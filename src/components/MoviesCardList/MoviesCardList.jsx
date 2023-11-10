import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, onLike, onDislike}) {

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            onLike={onLike}
            onDislike={onDislike}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
