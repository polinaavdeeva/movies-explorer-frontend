import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info-container">
        <p className="footer__year">&copy; 2023</p>
        <nav>
          <ul className="footer__list">
            <li className="footer__list-item">
              <Link
                className="footer__link"
                to="https://practicum.yandex.ru/"
                target="_blank"
              >
                Яндекс Практикум
              </Link>
            </li>
            <li className="footer__list-item">
              <Link
                className="footer__link"
                to="https://github.com/polinaavdeeva"
                target="_blank"
              >
                Github
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
