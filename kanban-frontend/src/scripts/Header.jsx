import React from 'react'; // Импортируем React
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom

// Компонент Header, который принимает несколько пропсов:
// user — объект с данными текущего пользователя
// OnTasksClick, OnProjectsClick — функции для обработки кликов на кнопки "Задачи" и "Проекты"
const Header = ({ user, OnTasksClick, OnProjectsClick }) => {
    
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
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Логотип */}
                    <div className="flex items-center space-x-2">
                        <img
                            src="/assets/icon.png" // Путь к изображению логотипа
                            alt="Логотип"
                            className="h-8 w-8 object-contain" // Применение стилей к изображению
                        />
                        <h1 className="text-xl font-bold text-gray-800">Kanban</h1> {/* Название приложения */}
                    </div>

                    {/* Кнопки навигации */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center space-x-4">
                            <button 
                                onClick={() => handleButtonClick(OnProjectsClick)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                            >
                                Проекты {/* Кнопка для перехода к проектам */}
                            </button>
                            <button 
                                onClick={() => handleButtonClick(OnTasksClick)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                            >
                                Задачи {/* Кнопка для перехода к задачам */}
                            </button>
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                Возможности {/* Кнопка для перехода к разделу "Возможности" */}
                            </button>
                        </div>

                        {/* Кнопки авторизации */}
                        <div className="flex items-center space-x-4">
                            {user ? ( // Если пользователь авторизован
                                <div className="text-gray-600"> {/* Информация о пользователе */}
                                    <span>{`Добро пожаловать, ${user.name || "Гость"}!`}</span>
                                </div>
                            ) : ( // Если пользователь не авторизован, отображаются кнопки входа и регистрации
                                <>
                                    <Link 
                                        to="/login" 
                                        className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                    >
                                        Вход {/* Кнопка для входа в аккаунт */}
                                    </Link>
                                    <Link 
                                        to="/register" 
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200"
                                    >
                                        Регистрация {/* Кнопка для регистрации нового пользователя */}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; // Экспортируем компонент
