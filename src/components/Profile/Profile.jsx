import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrectUserContext";
import { useState } from "react";
import { EMAIL_PATTERN } from "../../utils/constants";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Profile({setCurrentUser, setLoggedIn, setSavedMoviesList}) {
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setIsValid, setValues} = useFormAndValidation();
  const [statusMessage, setStatusMessage] = useState({isError: false, message: ""});
  const [isSubmitPresent, setIsSubmitPresent] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsValid(false);
    const userData = {name: values.name, email: values.email};
    mainApi
      .editUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        setIsSubmitPresent(false);
        setStatusMessage({isError: false, message: "Профиль отредактирован успешно!"});
      })
      .catch((error) => {
        console.log(error);
        setStatusMessage({isError: true, message: "При обновлении профиля произошла ошибка."})
      });
  };

  function handleButtonEdit() {
    setIsSubmitPresent(true);
    setStatusMessage({isError: false, message: ""});
  }

  function handleValueChange(e) {
    handleChange(e);
    const {name, value} = e.target;
    if ((name === "email" && value === currentUser.email) && (values["name"] === currentUser.name)) {
      setIsValid(false);
    }
    if ((name === "name" && value === currentUser.name) && (values["email"] === currentUser.email)) {
      setIsValid(false);
    }
  }

  React.useEffect(() => {
    setValues({name: currentUser.name, email: currentUser.email});
  }, [currentUser]);

  function logOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    setSavedMoviesList([]);
    navigate("/", {replace: true});
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
              name="name"
              placeholder="Имя"
              required
              minLength="2"
              value={values["name"] || ""}
              onChange={handleValueChange}
              disabled={!isSubmitPresent}
              className={`profile__container-input ${
                errors["name"] ? "profile__input_error" : ""
              }`}
            />
          </label>
          {errors["name"] && (
            <span className="profile__error-message">{errors["name"]}</span>
          )}
          <label className="profile__container">
            <p className="profile__container-title">E-mail</p>
            <input
              className={`profile__container-input ${
                errors["email"] ? "profile__input_error" : ""
              }`}
              type="email"
              name="email"
              required
              value={values["email"] || ""}
              onChange={handleValueChange}
              disabled={!isSubmitPresent}
              pattern={EMAIL_PATTERN.source}
              placeholder="pochta@yandex.ru"
            />
          </label>
          {errors["email"] && (
            <span className="profile__error-message">{errors["email"]}</span>
          )}
          <div className="profile__buttons">
            {statusMessage.isError ?
              <p className="profile__error-message">{statusMessage.message}</p>
              :
              <p className="profile__success-message">{statusMessage.message}</p>
            }
            {isSubmitPresent ?
              <button
                className={`register__button ${
                  !isValid ? "register__button_disabled" : ""
                }`}
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </button>
              :
              <>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={handleButtonEdit}
                >
                  Редактировать
                </button>
                <div className="profile__exit-link">
                  <button
                    className="profile__exit-button"
                    type="submit"
                    onClick={logOut}
                  >
                    Выйти из аккаунта
                  </button>
                </div>
              </>
            }
          </div>
        </form>
      </section>
    </main>
  );
}

export default Profile;
