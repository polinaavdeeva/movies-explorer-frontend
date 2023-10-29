import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function Navigation() {
  const location = useLocation();

  return (
    <li>
      <section className="header__navigation-item">
        <ul className="header__nav-list">
          <li>
            <Link
              className={`header__nav-link ${
                location.pathname === "/movies" ? "header__nav-active-link" : ""
              }`}
              to="/movies"
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              className={`header__nav-link ${
                location.pathname === "/saved-movies"
                  ? "header__nav-active-link"
                  : ""
              }`}
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/"
                  ? "header__nav-button"
                  : "header__nav-button-white"
              }
              to="/profile"
            >
              Профиль
            </Link>
          </li>
        </ul>
      </section>
      <BurgerMenu />
    </li>
  );
}

export default Navigation;
