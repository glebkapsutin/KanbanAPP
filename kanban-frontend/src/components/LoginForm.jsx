import { useState } from "react";
import '../styles/App.css'
function LoginForm({onLoginSuccess}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
        localStorage.setItem('user', JSON.stringify(data));
        alert('Вход успешен!');
        console.log('Передаваемые данные пользователя:', {
          id: data.id || data.userId,
          name: data.name || data.userName || 'Гость',
          email: data.email || 'email не указан',
        });
        onLoginSuccess({
          id : data.id,
          name : data.name,
          email : data.email,});
      } else {
        alert('Ошибка: ' + data.Message);
      }
    } catch (error) {
      alert('Ошибка при входе: ' + error.message);
    }
  };

  return (
    <div >

      <form className='register-form'onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
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
          <input className="register-input"
            type="string"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
     
    </div>
  );
}
export default LoginForm;