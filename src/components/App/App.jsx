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
import { auth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSuccessMessage, setIsSuccessMessage] = useState("");
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);

  const navigate = useNavigate();
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

  function logIn() {
    setIsLoggedIn(true);
  }

  useEffect(() => {

  })

  useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem("token")) {
        const jwt = localStorage.getItem("token");
        auth
          .checkToken(jwt)
          .then((data) => {
            if (!data) {
              return;
            }
            setIsLoggedIn(true);
            navigate("/", { replace: true });
          })
          .catch(() => {
            setIsLoggedIn(false);
          });
      }
    };
    handleTokenCheck();
  }, []);

  const headerPaths =
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile";

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {headerPaths && <Header login={isLoggedIn} />}
        <Routes>
          <Route path="/" element={<Main loggedIn={isLoggedIn} />} />
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
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
                setIsLoggedIn={logIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                setIsSuccessMessage={setIsSuccessMessage}
                isSuccessMessage={isSuccessMessage}
                setIsLoggedIn={logIn}
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
