import React from 'react';

import "../styles/header.css";

const Header =({onRegisterClick, onLoginClick, user}) =>{
    console.log('Данные пользователя в Header:', user);
    return (
        <header className='header'>
           
            <div className="header_logo">
                <img
                src="/assets/icon.png"
                alt="Логотип"
                className="header_image"
                />
                <h1>Kanban</h1>
            </div>
            <div className='header_buttons'>

                    {user ? (
                <div className="user-info">
                    <span>{`Добро пожаловать, ${user.name || "Гость"} `}!</span>
                    
                </div>
                ) : (
                <>
                    <button className='header_button' onClick={onLoginClick}>
                    Вход
                    </button>
                    <button className='header_button' onClick={onRegisterClick}>
                    Регистрация
                    </button>
                </>
                )}
            </div>
        </header>
    );
    
};
export default Header;