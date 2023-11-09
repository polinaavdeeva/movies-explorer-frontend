import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../../images/логотип.svg";

function Register() {
  return (
    <main className="register">
      <section className="register__page">
        <Link to="/">
          <img className="register__logo" src={Logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form">
          <label className="register__label">
            Имя
            <input
              className="register__input"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
          </label>
          <label className="register__label">
            E-mail
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder="E-mail"
              required
            />
          </label>
          <label className="register__label">
            Пароль
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              minLength="4"
              maxLength="30"
              required
            />
          </label>
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы? {" "}
          {
            <Link className="register__link" to="/signin">
              Вход
            </Link>
          }
        </p>
      </section>
    </main>
  );
}

export default Register;
