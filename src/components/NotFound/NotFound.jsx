import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main>
      <section className="not-found">
        <div className="not-found__error-container">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__error-text">Страница не найдена</p>
        </div>
        <Link className="not-found__return-link" to="/">
          Назад
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
