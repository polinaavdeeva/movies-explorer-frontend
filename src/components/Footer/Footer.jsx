import React from "react";
import "./Footer.css";

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
              <a className="footer__link" href="https://practicum.yandex.ru/">
                Яндекс Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a
                className="footer__link"
                href="https://github.com/polinaavdeeva"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
