import React from "react";
import { useState } from "react";
import { Routes, Route} from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  function logIn (event) {
    event.preventDefault()
    setIsLoggedIn(true);
  };

  function logOut (event) {
    setIsLoggedIn(false);
  };

  const headerPaths =
    location.pathname === "/" ||
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile";

  return (
    <div className="page">
      {headerPaths && <Header login={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile logout={logOut} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login login={logIn} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
