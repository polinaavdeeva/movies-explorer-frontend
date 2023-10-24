import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../images/логотип.svg";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ login }) {
  const location = useLocation();

  return (
    <header
      className={`header ${location.pathname !== "/" ? "header_pink" : ""}`}
    >
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="Логотип" />
      </Link>
      <nav>
        <ul className="header__navigation-list">
          {login ? <Navigation/>  : (
            <>
              <li>
                <Link
                  className="header__link" 
                  to="/signup"
                >
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  className="header__signin-button"
                  to="/signin"
                >
                  Войти
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
