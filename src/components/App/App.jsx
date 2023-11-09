import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Regeister";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { CurrentUserContext } from "../../contexts/CurrectUserContext";
import { mainApi } from "../../utils/MainApi";
import { HEADER_PATH_LIST } from "../../utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = useState({});
  const [isSuccessMessage, setIsSuccessMessage] = useState("");
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userData, savedMovies]) => {
          setCurrentUser(userData);
          setSavedMoviesList(savedMovies);
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        });
    }
  }, [isLoggedIn]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {HEADER_PATH_LIST.includes(location.pathname) && <Header login={isLoggedIn} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                loggedIn={isLoggedIn}
                savedMovies={savedMoviesList}
                setSavedMoviesList={setSavedMoviesList}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={isLoggedIn}
                setSavedMoviesList={setSavedMoviesList}
                savedMovies={savedMoviesList}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                loggedIn={isLoggedIn}
                setLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
                setSavedMoviesList={setSavedMoviesList}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRouteElement
                element={Register}
                loggedIn={isLoggedIn}
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
                setIsLoggedIn={setIsLoggedIn}
              />}
          />
          <Route
            path="/signin"
            element={<ProtectedRouteElement
              element={Login}
              loggedIn={isLoggedIn}
              setIsSuccessMessage={setIsSuccessMessage}
              isSuccessMessage={isSuccessMessage}
              setIsLoggedIn={setIsLoggedIn}
            />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
