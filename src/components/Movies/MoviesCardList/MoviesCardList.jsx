import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from "../../../utils/moviesData";
import { savedMovies } from "../../../utils/moviesData";
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
  let location = useLocation();

  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {location.pathname === "/movies"
          ? movies.map((movie) => <MoviesCard key={movie._id} movie={movie} />)
          : savedMovies.map((movie) => <MoviesCard key={movie._id} movie={movie} />)
        }
      </ul>
      <button type="button" className="movies-cards__more">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
