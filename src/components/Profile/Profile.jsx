import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({ logout }) {
  return (
    <main>
      <section className="profile">
        <h1 className="profile__greeting">Привет, Полина!</h1>
        <form className="profile__form" >
          <label className="profile__container">
            <p className="profile__container-title">Имя</p>
            <input
              className="profile__container-input"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            ></input>
          </label>

          <label className="profile__container">
            <p className="profile__container-title">E-mail</p>
            <input
              className="profile__container-input"
              type="email"
              name="email"
              placeholder="pochta@yandex.ru"
              required
            ></input>
          </label>

          <div className="profile__buttons">
            <button className="profile__edit-button" type="button">
              Редактировать
            </button>
            <Link to="/" className="profile__exit-link">
              <button className="profile__exit-button" type="submit" onClick={logout}>
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
