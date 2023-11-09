import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../../images/логотип.svg";
import { auth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { emailPattern, namePattern } from "../../utils/constants";

function Register({ setIsLoggedIn }) {
  const [statusMessage, setStatusMessage] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isButtonDisabled = passwordError || nameError || emailError;

  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    const { name, email, password } = e.target;

    auth
      .register(name.value, email.value, password.value)
      .then(() => {
        auth.authorize(email.value, password.value).then((data) => {
          setIsLoggedIn();
          navigate("/movies");
          localStorage.setItem("token", data.token);
        });
      })
      .catch((error) => {
        if (error.status === 409) {
          setStatusMessage("Пользователь с таким email уже существует");
        } else {
          console.log(error);
          setStatusMessage(
            "При регистрации пользователя произошла ошибка.Попробуйте ещё раз!"
          );
        }
      });
  }

  const validateName = (value) => {
    switch (true) {
      case value.length === 0:
        return "Пожалуйста, введите имя";
      case value.length < 2:
        return "Слово должно содержать не менее 2 букв";
      case value.length > 30:
        return "Слово должно содержать не более 30 символов";
      case !namePattern.test(value):
        return "Слово должно содержать только буквы, пробелы, дефисы";
      default:
        return "";
    }
  };

  const handleChangeName = (e) => {
    const value = e.target.value;

    const errorMessage = validateName(value);
    setNameError(errorMessage);
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
              onChange={handleChangeName}
              className={`register__input ${
                nameError ? "register__input_error" : ""
              }`}
            />
            {nameError && (
              <span className="register__error-message">{nameError}</span>
            )}
          </label>
          <label className="register__label">
            E-mail
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={handleChangeEmail}
              className={`register__input ${
                emailError ? "register__input_error" : ""
              }`}
            />
            {emailError && (
              <span className="register__error-message">{emailError}</span>
            )}
          </label>
          <label className="register__label">
            Пароль
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              onChange={handleChangePassword}
              className={`register__input ${
                passwordError ? "register__input_error" : ""
              }`}
            />
            {passwordError && (
              <span className="register__error-message">{passwordError}</span>
            )}
          </label>
          <span className="register__error">{statusMessage}</span>
          <button
            className={`register__button ${
              isButtonDisabled ? "register__button_disabled" : ""
            }`}
            type="submit"
            disabled={isButtonDisabled}
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
