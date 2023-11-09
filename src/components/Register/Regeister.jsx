import React, { useEffect } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../../images/логотип.svg";
import { auth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EMAIL_PATTERN } from "../../utils/constants";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Register({setIsLoggedIn}) {
  const {values, handleChange, errors, isValid, setIsValid} = useFormAndValidation();
  const [statusMessage, setStatusMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => setStatusMessage(""), [values])

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsValid(false);
    const {name, email, password} = e.target;

    auth
      .register(name.value, email.value, password.value)
      .then(() => {
        auth.authorize(email.value, password.value).then(({token}) => {
          localStorage.setItem("jwt", token);
          setIsLoggedIn(true);
          navigate("/movies", {replace: true});
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 401) {
          setStatusMessage("Вы ввели неправильный логин или пароль.");
        } else if (error.status === 409) {
          setStatusMessage("Пользователь с таким email уже существует");
        } else {
          setStatusMessage("При регистрации пользователя произошла ошибка.");
        }
      });
  }

  return (
    <main className="register">
      <section className="register__page">
        <Link to="/">
          <img className="register__logo" src={Logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleFormSubmit} noValidate>
          <label className="register__label">
            Имя
            <input
              name="name"
              type="text"
              placeholder="Имя"
              minLength="2"
              onChange={handleChange}
              value={values["name"] || ""}
              required
              className={`register__input ${
                errors["name"] ? "register__input_error" : ""
              }`}
            />
            {errors["name"] && <span className="register__error-message">{errors["name"]}</span>}
          </label>
          <label className="register__label">
            E-mail
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={values["email"] || ""}
              required
              pattern={EMAIL_PATTERN.source}
              className={`register__input ${
                errors["email"] ? "register__input_error" : ""
              }`}
            />
            {errors["email"] && <span className="register__error-message">{errors["email"]}</span>}
          </label>
          <label className="register__label">
            Пароль
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              minLength="8"
              onChange={handleChange}
              value={values["password"] || ""}
              required
              className={`register__input ${
                errors["password"] ? "register__input_error" : ""
              }`}
            />
            {errors["password"] && <span className="register__error-message">{errors["password"]}</span>}
          </label>
          <span className="register__error">{statusMessage}</span>
          <button
            className={`register__button ${
              !isValid ? "register__button_disabled" : ""
            }`}
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?{" "}
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
