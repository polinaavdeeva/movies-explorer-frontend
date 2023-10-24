import React from "react";
import "./Profile.css";

function Profile({logout}) {
  return (
    <>
      <section className="profile">
        <h1 className="profile__greeting">Привет, Полина!</h1>
        <form className="profile__form" onSubmit={logout}>
          <label className="profile__container">
            <p className="profile__container-title">Имя</p>
            <input
              className="profile__container-input"
              type="text"
              name="name"
              placeholder="Имя"
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
            <button className="profile__exit-button" type="submit">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
