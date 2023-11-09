import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  savedMovies,
  preloader,
  setSavedMoviesList
}) {

  console.log(savedMovies);
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {preloader && <Preloader />}
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            savedMovies={savedMovies}
            setSavedMoviesList={setSavedMoviesList}
            movie={movie}
          />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
