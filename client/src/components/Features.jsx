import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Fade,
  Zoom,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as TaskIcon,
  Group as TeamIcon,
  Timeline as TimelineIcon,
  Notifications as NotificationIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Cloud as CloudIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => {
  const theme = useTheme();
  
  return (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }} sx ={{ borderRadius: '16px',}}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[10],
          },
          background: theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 30, 0.9)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: 2,
              color: theme.palette.primary.main,
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body1" 
            align="center"
            sx={{ 
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );
};

const Features = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      title: 'Канбан-доска',
      description: 'Управляйте задачами с помощью интуитивно понятной канбан-доски. Перетаскивайте задачи между колонками для изменения их статуса.',
      delay: 100,
    },
    {
      icon: <TaskIcon sx={{ fontSize: 40 }} />,
      title: 'Управление задачами',
      description: 'Создавайте, редактируйте и удаляйте задачи. Устанавливайте приоритеты, сроки выполнения и назначайте исполнителей.',
      delay: 200,
    },
    {
      icon: <TeamIcon sx={{ fontSize: 40 }} />,
      title: 'Командная работа',
      description: 'Приглашайте участников в проекты, назначайте задачи и отслеживайте прогресс команды в реальном времени.',
      delay: 300,
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: 'Отслеживание прогресса',
      description: 'Следите за прогрессом выполнения задач с помощью визуальных индикаторов и статистики.',
      delay: 400,
    },
    {
      icon: <NotificationIcon sx={{ fontSize: 40 }} />,
      title: 'Уведомления',
      description: 'Получайте уведомления о важных событиях, изменениях статуса задач и приближающихся дедлайнах.',
      delay: 500,
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Безопасность',
      description: 'Ваши данные надежно защищены. Система разграничения прав доступа обеспечивает безопасность информации.',
      delay: 600,
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Быстрая работа',
      description: 'Оптимизированный интерфейс обеспечивает быструю и эффективную работу с задачами и проектами.',
      delay: 700,
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
      title: 'Облачное хранение',
      description: 'Доступ к вашим задачам и проектам с любого устройства благодаря облачному хранению данных.',
      delay: 800,
    },
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 8,
        background: 'linear-gradient(45deg, #f3f4f6 30%, #e5e7eb 90%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            Назад
          </Button>
        </Box>
        
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Возможности приложения
            </Typography>
            <Typography
              variant="h5"
              color={theme.palette.primary.main}
              sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              Откройте для себя все преимущества нашего канбан-приложения для эффективного управления задачами и проектами
            </Typography>
          </Box>
        </Fade>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
