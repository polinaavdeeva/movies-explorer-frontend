import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import "../Movies/Movies.css";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <main className="movies">
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
