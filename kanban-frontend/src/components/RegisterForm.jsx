import { useState } from "react";
import '../styles/App.css'
function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    SurName: '',
    age: 0,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Обновляем нужное поле в объекте formData
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    try {
      const response = await fetch('http://localhost:5291/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Отправляем данные формы
      });

      const data = await response.json(); // Получаем ответ от сервера
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        alert('Регистрация успешна!');
      } else {
        alert('Ошибка: ' + data.Message);
      }
    } catch (error) {
      alert('Ошибка при регистрации: ' + error.message);
    }
  };

  return (
    <div className="register-form">
      <center>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="string"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="string"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Имя:</label>
          <input
            type="string"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Фамилия:</label>
          <input
            type="string"
            name="SurName"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Возраст:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Описание:</label>
          <input
            type="string"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      </center>
    </div>
  );
}
export default RegisterForm;