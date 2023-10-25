import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__content">
          <div className="about-project__content-item">
            <h3 className="about-project__content-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__content-subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__content-item">
            <h3 className="about-project__content-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__content-subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <ul className="about-project__development-container">
          <li className="about-project__development-item">
            <div className="about-project__development-backend">1 неделя</div>
            <p className="about-project__development-type">Back-end</p>
          </li>
          <li className="about-project__development-item">
            <div className="about-project__development-frontend">4 недели</div>
            <p className="about-project__development-type">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
