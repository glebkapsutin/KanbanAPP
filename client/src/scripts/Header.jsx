import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  Rocket as RocketIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',

  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Header = ({ user, OnTasksClick, OnProjectsClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleButtonClick = (action) => {
    if (user) {
      action();
    } else {
      alert("Войдите в аккаунт чтобы получить доступ к этой функции");
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar className="container mx-auto">
        <Box className="flex items-center space-x-2">
          <img
            src="/assets/icon.png"
            alt="Логотип"
            className="h-8 w-8 object-contain"
          />
          <Typography variant="h4" className="text-white font-bold">
            Kanban
          </Typography>
        </Box>

        <Box className="flex-grow" />

        {!isMobile ? (
          <Box className="flex items-center space-x-4">
            <StyledButton
              startIcon={<DashboardIcon />}
              onClick={() => handleButtonClick(OnProjectsClick)}
            >
              Проекты
            </StyledButton>
            <StyledButton
              startIcon={<TaskIcon />}
              onClick={() => handleButtonClick(OnTasksClick)}
            >
              Задачи
            </StyledButton>
            <StyledButton
              startIcon={<RocketIcon />}
            >
              Возможности
            </StyledButton>

            {user ? (
              <Box className="flex items-center space-x-2">
                <Avatar 
                  alt={user.name} 
                  src={user.avatar}
                  className="bg-blue-200"
                />
                <Typography variant="body1" className="text-white">
                  {user.name || "Гость"}
                </Typography>
              </Box>
            ) : (
              <Box className="flex items-center space-x-2">
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Вход
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  className="bg-white text-blue-600 hover:bg-blue-100"
                >
                  Регистрация
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleButtonClick(OnProjectsClick);
                handleClose();
              }}>
                <DashboardIcon className="mr-2" /> Проекты
              </MenuItem>
              <MenuItem onClick={() => {
                handleButtonClick(OnTasksClick);
                handleClose();
              }}>
                <TaskIcon className="mr-2" /> Задачи
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <RocketIcon className="mr-2" /> Возможности
              </MenuItem>
              {!user && (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleClose}>
                    Вход
                  </MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleClose}>
                    Регистрация
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
