import React from 'react';
import "./NavTab.css"

function NavTab() {
  return (
    <nav className="nav-tab">
    <ul className="nav-tab__links">
      <li className="nav-tab__link">
        <a className="nav-tab__item" href="#about-project">
          О проекте
        </a>
      </li>
      <li className="nav-tab__link">
        <a className="nav-tab__item" href="#techs">
          Технологии
        </a>
      </li>
      <li className="nav-tab__link">
        <a className="nav-tab__item" href="#student">
          Студент
        </a>
      </li>
    </ul>
  </nav>
  );
}

export default NavTab;
