import { SHORT_DURATION } from "./constants";

export function getTimes(duration) {
  const hours = Math.trunc(duration / 60);
  const min = duration % 60;
  return `${hours}ч ${min}м`;
}

export function filterAllMovies(moviesList, searchWord) {
  const lowerSearchWord = searchWord.toLowerCase();

  const filteredMovies = moviesList.filter((movie) => {
    const lowerNameRU = movie.nameRU.toLowerCase();
    const lowerNameEN = movie.nameEN.toLowerCase();

    return (
      lowerNameRU.includes(lowerSearchWord) ||
      lowerNameEN.includes(lowerSearchWord)
    );
  });

  return filteredMovies;
}

export function filterShortMovies(moviesList) {
  return moviesList.filter((movies) => movies.duration <= SHORT_DURATION)
}
