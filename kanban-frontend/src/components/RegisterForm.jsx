import { useState } from "react";
import '../styles/App.css';

function RegisterForm() {
  // Состояние для хранения данных формы регистрации
  const [formData, setFormData] = useState({
    email: '',        // Почта
    password: '',     // Пароль
    name: '',         // Имя
    SurName: '',      // Фамилия
    age: 0,           // Возраст
    description: '',  // Описание
  });

  // Обработчик изменения данных в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Обновляем соответствующее поле в объекте formData
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    try {
      // Отправляем данные формы на сервер для регистрации
      const response = await fetch('http://localhost:5291/api/Auth/register', {
        method: 'POST', // Используем POST запрос
        headers: {
          'Content-Type': 'application/json', // Отправляем данные в формате JSON
        },
        body: JSON.stringify(formData), // Преобразуем данные формы в строку JSON
      });

      const data = await response.json(); // Получаем ответ от сервера
      if (response.ok) {
        // Если регистрация успешна, сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(data));
        alert('Регистрация успешна!'); // Оповещаем пользователя об успешной регистрации
      } else {
        alert('Ошибка: ' + data.Message); // Если ошибка, показываем сообщение об ошибке
      }
    } catch (error) {
      // Если произошла ошибка при отправке запроса
      alert('Ошибка при регистрации: ' + error.message);
    }
  };

  return (
    <div >
      {/* Форма регистрации */}
      <form className='register-form' onSubmit={handleSubmit}>
        {/* Поле для ввода email */}
        <div>
          <label>Email:</label>
          <input
            className="register-input"
            type="string"
            name="email"
            value={formData.email}
            onChange={handleChange} // Обработчик изменения поля
            required
          />
        </div>
        {/* Поле для ввода пароля */}
        <div>
          <label>Пароль:</label>
          <input
            className="register-input"
            type="string"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Поле для ввода имени */}
        <div>
          <label>Имя:</label>
          <input
            className="register-input"
            type="string"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Поле для ввода фамилии */}
        <div>
          <label>Фамилия:</label>
          <input
            className="register-input"
            type="string"
            name="SurName"
            value={formData.SurName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Поле для ввода возраста */}
        <div>
          <label>Возраст:</label>
          <input
            className="register-input"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        {/* Поле для ввода описания */}
        <div>
          <label>Описание:</label>
          <input
            className="register-input"
            type="string"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        {/* Кнопка для отправки формы */}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default RegisterForm;
