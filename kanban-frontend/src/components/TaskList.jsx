import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Box,
} from '@mui/material';

// Компонент TaskList, который принимает пропс tasks (список задач)
const TaskList = ({ tasks }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return 'error'; // To Do
      case 1:
        return 'warning'; // In Progress
      case 2:
        return 'success'; // Done
      default:
        return 'default';
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
    <Paper className="p-6 mb-8 bg-white shadow-lg rounded-lg">
      <Typography variant="h4" className="mb-6 font-bold text-gray-800">
        Список задач
      </Typography>
      
      {tasks && tasks.length > 0 ? (
        <List className="space-y-4">
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ListItemText
                primary={
                  <Box className="flex items-center justify-between">
                    <Typography variant="h6" className="font-semibold text-gray-800">
                      {task.taskName}
                    </Typography>
                    <Chip
                      label={getStatusText(task.status)}
                      color={getStatusColor(task.status)}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" className="text-gray-600 mt-2">
                    {task.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" className="text-gray-500 text-center py-8">
          Задач пока нет
        </Typography>
      )}
    </Paper>
  );
};

export default TaskList; // Экспортируем компонент
