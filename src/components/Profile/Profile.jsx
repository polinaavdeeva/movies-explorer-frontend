import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrectUserContext";
import { useState } from "react";
import { namePattern, emailPattern } from "../../utils/constants";

function Profile({setCurrentUser ,setLoggedIn}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const isButtonDisabled =
    (name === currentUser.name && email === currentUser.email) ||
    nameError ||
    emailError;

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
    setName(value);

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
    setEmail(value);

    const errorMessage = validateEmail(value);
    setEmailError(errorMessage);
  };

  const onUpdateUser = (userData) => {
    mainApi
      .editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        setStatusMessage(true);
      })
      .catch((error) => {
        console.log(`Ошибка ${error}`);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: name,
      email: email,
    });
  };

  React.useEffect(() => {
    setName(currentUser.name || "");
    setEmail(currentUser.email || "");
  }, [currentUser]);

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("filter-movies");
    localStorage.removeItem("saved-movies");
    localStorage.removeItem("search-word");
    localStorage.removeItem("checkbox");
    setCurrentUser({});
    setLoggedIn(false);
  }

  return (
    <main>
      <section className="profile">
        <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleFormSubmit} noValidate>
          <label className="profile__container">
            <p className="profile__container-title">Имя</p>
            <input
              type="text"
              name="profile-name"
              placeholder="Имя"
              value={name}
              onChange={handleChangeName}
              className={`profile__container-input ${
                nameError ? "profile__input_error" : ""
              }`}
            />
          </label>
          {nameError && (
            <span className="profile__error-message">{nameError}</span>
          )}
          <label className="profile__container">
            <p className="profile__container-title">E-mail</p>
            <input
              className={`profile__container-input ${
                emailError ? "profile__input_error" : ""
              }`}
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="pochta@yandex.ru"
            />
          </label>
          {emailError && (
            <span className="profile__error-message">{emailError}</span>
          )}
          <div className="profile__buttons">
          {statusMessage && (
          <p className="profile__success-message">Профиль отредактирован успешно!</p>
        )}
            <button
              className={`profile__edit-button ${
                isButtonDisabled ? "profile__edit-button_disabled" : ""
              }`}
              type="submit"
              disabled={isButtonDisabled}
            >
              Редактировать
            </button>
            <Link to="/" className="profile__exit-link">
              <button
                className="profile__exit-button"
                type="submit"
                onClick={logOut}
              >
                Выйти из аккаунта
              </button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
