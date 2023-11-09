import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/логотип.svg";
import { auth } from "../../utils/Auth";
import { emailPattern,namePattern } from "../../utils/constants";
import { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [statusMessage, setStatusMessage] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isButtonDisabled = passwordError || emailError;

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;

    auth
      .authorize(email.value, password.value)
      .then((data) => {
        setIsLoggedIn();
        navigate("/movies");
        localStorage.setItem("token", data.token);
      })
      .catch((error) => {
        if (error.status === 401) {
          setStatusMessage("Пользователь с таким email уже существует");
        } else {
          setStatusMessage("Произошла ошибка.Попробуйте ещё раз!");
        }
      });
  };

  const validateEmail = (value) => {
    switch (true) {
      case value.length === 0:
        return "Пожалуйста, введите адрес электронной почты";
      case !emailPattern.test(value):
        return "Пожалуйста, введите корректный адрес электронной почты";
      default:
        return "";
    }
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;

    const errorMessage = validateEmail(value);
    setEmailError(errorMessage);
  };

  const validatePassowrd = (value) => {
    switch (true) {
      case value.length === 0:
        return "Пожалуйста, введите пароль";
      case value.length < 6:
        return "Пароль должен быть больше 6 символов";
      default:
        return "";
    }
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;

    const errorMessage = validatePassowrd(value);
    setPasswordError(errorMessage);
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
              onChange={handleChangeEmail}
              className={`login__input ${
                emailError ? "login__input_error" : ""
              }`}
            />
            {emailError && (
              <span className="login__error-message">{emailError}</span>
            )}
          </label>
          <label className="login__label">
            Пароль
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChangePassword}
              className={`login__input ${
                passwordError ? "login__input_error" : ""
              }`}
            />
            {passwordError && (
              <span className="login__error-message">{passwordError}</span>
            )}
          </label>
          <span className="login__error">{statusMessage}</span>
          <button
            className={`login__button ${
              isButtonDisabled ? "login__button_disabled" : ""
            }`}
            type="submit"
            disabled={isButtonDisabled}
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
