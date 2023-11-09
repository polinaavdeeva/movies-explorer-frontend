import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="not-found">
        <div className="not-found__error-container">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__error-text">Страница не найдена</p>
        </div>
        <button className="not-found__return-link" onClick={() => navigate(-1, { replace: true })}>
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
