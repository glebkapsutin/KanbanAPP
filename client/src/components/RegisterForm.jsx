import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

const RegisterForm = ({ onRegisterSuccess }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    age: '',
    description: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Проверяем обязательные поля
      if (!formData.name || !formData.surname || !formData.email || !formData.password || !formData.age) {
        setError('Пожалуйста, заполните все обязательные поля');
        return;
      }

      // Преобразуем возраст в число
      const requestData = {
        ...formData,
        age: parseInt(formData.age, 10),
      };

      const response = await fetch('http://localhost:5291/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      const data = await response.json();
      if (typeof onRegisterSuccess === 'function') {
        onRegisterSuccess(data);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Ошибка при регистрации. Проверьте введенные данные.');
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center p-4">
      <Paper
        className="p-8 rounded-xl backdrop-blur-sm bg-opacity-80 w-full max-w-md"
        elevation={3}
      >
        <Typography
          variant="h4"
          className="text-center mb-6 font-bold"
          sx={{
            color: theme.palette.mode === 'dark' ? 'white' : 'primary.main',
          }}
        >
          Регистрация
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
            className="rounded-lg"
            InputProps={{
              className: "rounded-lg",
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Фамилия"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            variant="outlined"
            className="rounded-lg"
            InputProps={{
              className: "rounded-lg",
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            variant="outlined"
            className="rounded-lg"
            InputProps={{
              className: "rounded-lg",
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            variant="outlined"
            className="rounded-lg"
            InputProps={{
              className: "rounded-lg",
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="text-gray-400" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Возраст"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            variant="outlined"
            className="rounded-lg"
            InputProps={{
              className: "rounded-lg",
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarIcon className="text-gray-400" />
                </InputAdornment>
              ),
              inputProps: { min: 0 }
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            className="rounded-lg"
            InputProps={{
              className: "rounded-lg",
            }}
            sx={{
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              },
            }}
          />

          {error && (
            <Typography
              variant="body2"
              className="text-red-500 text-center"
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="rounded-lg py-2 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
