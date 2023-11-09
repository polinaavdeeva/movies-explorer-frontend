import React, { useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/логотип.svg";
import { auth } from "../../utils/Auth";
import { EMAIL_PATTERN } from "../../utils/constants";
import { useState } from "react";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Login({setIsLoggedIn}) {
  const {values, handleChange, errors, isValid, setIsValid} = useFormAndValidation();
  const [statusMessage, setStatusMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => setStatusMessage(""), [values])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsValid(false);
    const {email, password} = e.target;

    auth
      .authorize(email.value, password.value)
      .then(({token}) => {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true);
        navigate("/movies", {replace: true});
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 401) {
          setStatusMessage("Вы ввели неправильный логин или пароль.");
        } else if (error.status === 409) {
          setStatusMessage("Пользователь с таким email уже существует");
        } else {
          setStatusMessage("Произошла ошибка.Попробуйте ещё раз!");
        }
      });
  };

  return (
    <main className="login">
      <section className="login__page">
        <Link to="/">
          <img className="login__logo" src={Logo} alt="Логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleFormSubmit} noValidate>
          <label className="login__label">
            E-mail
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={values["email"] || ""}
              required
              pattern={EMAIL_PATTERN.source}
              className={`login__input ${
                errors["email"] ? "login__input_error" : ""
              }`}
            />
            {errors["email"] && (
              <span className="login__error-message">{errors["email"]}</span>
            )}
          </label>
          <label className="login__label">
            Пароль
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              minLength="8"
              onChange={handleChange}
              required
              value={values["password"] || ""}
              className={`login__input ${
                errors["password"] ? "login__input_error" : ""
              }`}
            />
            {errors["password"] && (
              <span className="login__error-message">{errors["password"]}</span>
            )}
          </label>
          <span className="login__error">{statusMessage}</span>
          <button
            className={`login__button ${
              !isValid ? "login__button_disabled" : ""
            }`}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?{" "}
          {
            <Link className="login__link" to="/signup">
              Регистрация
            </Link>
          }
        </p>
      </section>
    </main>
  );
}

export default Login;
