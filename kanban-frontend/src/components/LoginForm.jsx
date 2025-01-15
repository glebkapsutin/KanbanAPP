import { useState } from "react";
import '../styles/App.css';

function LoginForm({ onLoginSuccess }) {
  // Состояние для данных формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Обработчик изменений в полях ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Обновляем нужное поле в объекте formData
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    try {
      // Отправляем запрос на сервер для входа
      const response = await fetch('http://localhost:5291/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Отправляем данные формы
      });

      const data = await response.json(); // Получаем ответ от сервера
      console.log('Ответ от сервера после входа:', data); 

      if (response.ok) {
        // Если ответ успешный, сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(data));
        alert('Вход успешен!');
        
        // Логируем передаваемые данные пользователя
        console.log('Передаваемые данные пользователя:', {
          id: data.id || data.userId,
          name: data.name || data.userName || 'Гость',
          email: data.email || 'email не указан',
        });

        // Вызываем callback для обработки успешного входа
        onLoginSuccess({
          id: data.id,
          name: data.name,
          email: data.email,
        });
      } else {
        // Если ошибка, выводим сообщение
        alert('Ошибка: ' + data.Message);
      }
    } catch (error) {
      // Обрабатываем ошибку при запросе
      alert('Ошибка при входе: ' + error.message);
    }
  };

  return (
    <div>
      {/* Форма входа */}
      <form className='register-form' onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          {/* Поле для ввода email */}
          <input className="register-input"
            type="string"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          {/* Поле для ввода пароля */}
          <input className="register-input"
            type="string"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Войти</button> {/* Кнопка отправки формы */}
      </form>
    </div>
  );
} 

export default LoginForm;
