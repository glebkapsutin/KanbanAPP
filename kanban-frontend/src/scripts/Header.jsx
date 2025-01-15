import React from 'react'; // Импортируем React
import "../styles/header.css"; // Импортируем стили для компонента

// Компонент Header, который принимает несколько пропсов:
// onRegisterClick, onLoginClick — функции для открытия окон регистрации и входа
// user — объект с данными текущего пользователя
// OnTasksClick, OnProjectsClick — функции для обработки кликов на кнопки "Задачи" и "Проекты"
const Header = ({ onRegisterClick, onLoginClick, user, OnTasksClick, OnProjectsClick }) => {
    
    // Функция для обработки кликов по кнопкам "Проекты" и "Задачи"
    const handleButtonClick = (action) => {
        if (user) { // Если пользователь авторизован
            action(); // Выполнить переданную функцию (OnTasksClick или OnProjectsClick)
        } else {
            alert("Войдите в аккаунт чтобы получить доступ к этой функции"); // Если пользователь не авторизован, показать предупреждение
        }
    };

    console.log('Данные пользователя в Header:', user); // Логируем данные пользователя для отладки

    return (
        <header className='header'> {/* Контейнер для шапки */}
            <div className="header_logo"> {/* Логотип */}
                <img
                    src="/assets/icon.png" // Путь к изображению логотипа
                    alt="Логотип"
                    className="header_image" // Применение стилей к изображению
                />
                <h1>Kanban</h1> {/* Название приложения */}
            </div>

            <div className="header_buttons"> {/* Контейнер для кнопок */}
                <div className="center_buttons"> {/* Кнопки для навигации */}
                    <button className='header_button' onClick={() => handleButtonClick(OnProjectsClick)}>
                        Проекты {/* Кнопка для перехода к проектам */}
                    </button>
                    <button className='header_button' onClick={() => handleButtonClick(OnTasksClick)}>
                        Задачи {/* Кнопка для перехода к задачам */}
                    </button>
                    <button className='header_button'>
                        Возможности {/* Кнопка для перехода к разделу "Возможности" */}
                    </button>
                </div>

                <div className="right_buttons"> {/* Кнопки для входа и регистрации */}
                    {user ? ( // Если пользователь авторизован
                        <div className="user-info"> {/* Информация о пользователе */}
                            <span>{`Добро пожаловать, ${user.name || "Гость"}!`}</span>
                        </div>
                    ) : ( // Если пользователь не авторизован, отображаются кнопки входа и регистрации
                        <>
                            <button className='header_button' onClick={onLoginClick}>
                                Вход {/* Кнопка для входа в аккаунт */}
                            </button>
                            <button className='header_button' onClick={onRegisterClick}>
                                Регистрация {/* Кнопка для регистрации нового пользователя */}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header; // Экспортируем компонент
