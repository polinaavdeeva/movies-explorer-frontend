import React from 'react';
import "./AboutMe.css";
import myPhoto from '../../../images/моё_фото.jpg';
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <section className='about-me' id='student'>
        <div className='about-me__container'>
        <h2 className='about-me__title'>Студент</h2>
        <div className='about-me__inform'>
            <div className='about-me__inform-item'>
                <h3 className='about-me__inform-name'>Полина</h3>
                <p className='about-me__inform-status'>Фронтенд-разработчица, 20 лет</p>
                <p className='about-me__inform-about'>Я родилась и живу в Воронеже, учусь на 3 курсе факультета компьютерных наук в ВГУ.</p>
                <Link className='about-me__inform-git' to='https://github.com/polinaavdeeva' target='_blank'>Github</Link>
            </div>
            <div className='about-me__inform-item'>
                <img className='about-me__inform-photo' src={myPhoto} alt='Фоторафия разработчика'/>
            </div>
        </div>
        </div>
    </section>
  );
}

export default AboutMe;
