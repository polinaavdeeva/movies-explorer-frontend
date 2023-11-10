import { MOVIES, SHORT_DURATION } from "./constants";
import { moviesApi } from "./MoviesApi";

export function getTimes(duration) {
  const hours = Math.floor(duration / 60);
  const min = duration % 60;
  return `${hours > 0 ? hours + 'ч ' : ''}${min}м`;
}

export function filterAllMovies(moviesList, searchWord, short) {
  const lowerSearchWord = searchWord.toLowerCase();
  return moviesList.filter((movie) => {
    const data = movie.nameRU.toLowerCase().includes(lowerSearchWord)
    return short ? (movie.duration <= SHORT_DURATION && data) : data
  });
}

export async function fetchAndUpdateMovies(setPreloader, setNetErrorMsg, sourceMovies, savedMovies) {
  setPreloader(true);
  try {
    const movies = await moviesApi.getMovies();
    return movies.map((movie) => {
      const savedMovieResult = savedMovies.find(data => data.movieId === movie.id)
      if (savedMovieResult) {
        return {...movie, isSaved: true, _id: savedMovieResult['_id']}
      } else {
        return {...movie, isSaved: false}
      }
    })
  } catch (error) {
    setNetErrorMsg(true);
    console.error(error);
  } finally {
    setPreloader(false);
  }
}

export function updateLocalStorage(movie) {
  const localStorageMovies = localStorage.getItem(MOVIES);
  if (localStorageMovies) {
    const updatedLocalStorageMovies = JSON.parse(localStorageMovies).map(data => (data.id === movie.id) ? movie : data);
    localStorage.setItem(MOVIES, JSON.stringify(updatedLocalStorageMovies));
  }
}
