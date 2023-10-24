import React from "react";
import "./BurgerMenu.css";
import AccountButton from "../../../images/account-white.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
  
    function hendleOpenMenu() {
      setIsOpen(!isOpen);
    }

    return (
      <>
        {!isOpen ? (
          <button
            className="header__burger-button"
            type="button"
            onClick={hendleOpenMenu}
          />
        ) : (
          <>
            <div className="header__burger-page">
              <nav className="header__burger-box">
                <ul className="header__burger-links">
                  <li>
                    <Link
                      className={`header__burger-link ${
                        location.pathname === "/" ? "header__burger-link_active" : ""
                      }`}
                      to="/"
                    >
                      Главная
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`header__burger-link ${
                        location.pathname === "/movies" ? "header__burger-link_active" : ""
                      }`}
                      to="/movies"
                    >
                      Фильмы
                    </Link>
                  </li>
                  <li>
                    <Link
                       className={`header__burger-link ${
                        location.pathname === "/saved-movies" ? "header__burger-link_active" : ""
                      }`}
                      to="/saved-movies"
                    >
                      Сохранённые фильмы
                    </Link>
                  </li>
                </ul>

                <button
                  className="header__burger-close"
                  type="button"
                  onClick={hendleOpenMenu}
                />
  
                <Link to="/profile" className="header__burger-link-profile">
                <div className="header__burger-link-profile-img">
                    <img src={AccountButton} alt="Иконка профиля" />
                  </div>
                </Link>
              </nav>
            </div>
          </>
        )}
      </>
    );
  }

export default BurgerMenu;