import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(8),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    age: 0,
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name || !formData.surname) {
      setError('Пожалуйста, заполните все обязательные поля');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return false;
    }
    if (formData.age < 0) {
      setError('Возраст не может быть отрицательным');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
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

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } else {
        setError(data.message || data.Message || 'Ошибка при регистрации');
      }
    } catch (error) {
      setError('Ошибка при подключении к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography component="h1" variant="h4" className="mb-6 font-bold text-gray-800">
        Регистрация
      </Typography>
      
      {error && (
        <Alert severity="error" className="w-full mb-4">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} className="w-full">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Фамилия"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Пароль"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Возраст"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Описание"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </StyledPaper>
  );
}

export default RegisterForm;
