import React from 'react';
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className='portfolio'>
        <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__projects-list'>
            <li className='portfolio__projects-item'>
                <a className='portfolio__projects-link' href='https://polinaavdeeva.github.io/how-to-learn/'>
                    Статичный сайт
                    <span className='portfolio__projects-arrow'>&#8599;</span>
                </a>
            </li>
            <li className='portfolio__projects-item'>
                <a className='portfolio__projects-link' href='https://polinaavdeeva.github.io/russian-travel/'>
                    Адаптивный сайт
                    <span className='portfolio__projects-arrow'>&#8599;</span>
                </a>
            </li>
            <li className='portfolio__projects-item'>
                <a className='portfolio__projects-link' href='https://websitemesto.students.nomoredomainsicu.ru'>
                    Одностаничное приложение
                    <span className='portfolio__projects-arrow'>&#8599;</span>
                </a>
            </li>
        </ul>
        </div>
    </section>
  );
}

export default Portfolio;
