import LoginForm from "./LoginForm"; // Импортируем компонент формы входа
import React from "react"; 
import "../styles/RegistrationANDloginWindow.css"; // Импортируем стили для окна регистрации и входа

// Компонент для отображения окна входа
const LoginWindow = ({ onClose, onLoginSuccess }) => {
    return (
        <div className="overlay"> {/* Это фон, который затемняет экран, когда окно открыто */}
            <div className="registration-window"> {/* Это само окно, где отображается форма входа */}
                {/* Кнопка для закрытия окна */}
                <button className="close-button" onClick={onClose}>
                    ✖ {/* Символ крестика для закрытия окна */}
                </button>
                {/* Вставляем форму для входа и передаем функцию обработки успешного входа */}
                <LoginForm onLoginSuccess={onLoginSuccess} />
            </div>
        </div>
    );
};

export default LoginWindow;
