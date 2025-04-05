import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Box,
  IconButton,
  Divider,
  Tooltip,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.2)',
  },
}));

// Компонент TaskList, который принимает пропс tasks (список задач)
const TaskList = ({ tasks }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return '#FF6B6B'; // To Do
      case 1:
        return '#4ECDC4'; // In Progress
      case 2:
        return '#45B7D1'; // Done
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'To Do';
      case 1:
        return 'In Progress';
      case 2:
        return 'Done';
      default:
        return 'Unknown';
    }
  };

  return (
    <StyledPaper>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-800">
          Список задач
        </Typography>
        <Fab
          color="primary"
          size="small"
          aria-label="add"
          onClick={() => {/* Обработчик добавления новой задачи */}}
        >
          <AddIcon />
        </Fab>
      </Box>

      {tasks && tasks.length > 0 ? (
        <List className="space-y-4">
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <StyledListItem className="bg-gray-50">
                <Box className="w-full">
                  <Box className="flex justify-between items-start mb-2">
                    <Typography variant="h6" className="font-semibold text-gray-800">
                      {task.name}
                    </Typography>
                    <Box className="flex items-center space-x-2">
                      <Chip
                        label={getStatusText(task.status)}
                        size="small"
                        style={{ backgroundColor: getStatusColor(task.status), color: 'white' }}
                      />
                      <Tooltip title="Редактировать">
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <IconButton size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Typography variant="body2" className="text-gray-600 mb-3">
                    {task.description}
                  </Typography>
                  <Box className="flex items-center justify-between">
                    <Chip
                      icon={<PersonIcon />}
                      label={task.userName || 'Не назначен'}
                      size="small"
                      variant="outlined"
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      className="flex items-center"
                    >
                      <AccessTimeIcon fontSize="small" className="mr-1" />
                      {new Date(task.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </StyledListItem>
              {index < tasks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box className="text-center py-8">
          <Typography variant="body1" className="text-gray-500 mb-4">
            Задач пока нет
          </Typography>
          <Fab
            color="primary"
            variant="extended"
            onClick={() => {/* Обработчик добавления новой задачи */}}
          >
            <AddIcon className="mr-2" />
            Добавить задачу
          </Fab>
        </Box>
      )}
    </StyledPaper>
  );
};

export default TaskList; // Экспортируем компонент
