import RegisterForm from "./RegisterForm"; // Импортируем компонент формы регистрации
import React from "react";
import "../styles/RegistrationANDloginWindow.css"; // Подключаем стили

// Компонент окна регистрации
const RegistrationWindow = ({ onClose, onRegisterSuccess }) => {
    const handleRegisterSuccess = (data) => {
        if (onRegisterSuccess) {
            onRegisterSuccess(data);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
    <div className="overlay"> {/* Создаём оверлей для затемнения фона */}
      <div className="registration-window"> {/* Основной контейнер для окна регистрации */}
        {/* Кнопка для закрытия окна */}
        <button className="close-button" onClick={onClose}>
         ✖
        </button>
        {/* Вставляем форму регистрации */}
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      </div>
    </div>
    );
};

export default RegistrationWindow;
