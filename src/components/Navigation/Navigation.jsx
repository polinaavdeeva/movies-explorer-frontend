import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function Navigation() {
  const location = useLocation();

  return (
    <>
      <section className="navigation">
        <ul className="navigation__list">
          <li>
            <Link
              className={`navigation__link ${
                location.pathname === "/movies" ? "navigation__active-link" : ""
              }`}
              to="/movies"
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              className={`navigation__link ${
                location.pathname === "/saved-movies"
                  ? "navigation__active-link"
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
                  ? "navigation__acc-button"
                  : "navigation__acc-button_white"
              }
              to="/profile"
            >
              Профиль
            </Link>
          </li>
        </ul>
      </section>
      <BurgerMenu />
    </>
  );
}

export default Navigation;
