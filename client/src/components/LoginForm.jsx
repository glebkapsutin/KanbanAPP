import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: '0 auto',
  marginTop: theme.spacing(8),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

function LoginForm({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    try {
      const response = await fetch('http://localhost:5291/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        onLoginSuccess({
          id: data.id,
          name: data.name,
          email: data.email,
        });
        navigate('/');
      } else {
        setError(data.Message || 'Ошибка при входе');
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
        Вход в систему
      </Typography>
      
      {error && (
        <Alert severity="error" className="w-full mb-4">
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} className="w-full">
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          {loading ? <CircularProgress size={24} /> : 'Войти'}
        </Button>
        
        <Box className="mt-4 text-center">
          <Typography variant="body2" className="text-gray-600">
            Нет аккаунта?{' '}
            <Link
              component={RouterLink}
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Зарегистрироваться
            </Link>
          </Typography>
        </Box>
      </Box>
    </StyledPaper>
  );
}

export default LoginForm;
