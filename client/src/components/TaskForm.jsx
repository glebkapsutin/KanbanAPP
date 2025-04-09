import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  InputAdornment,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  PriorityHigh as PriorityIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

const TaskForm = ({ open, onClose, onAddTask, selectedProject }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'To_Do',
    priority: 'Low',
    dueDate: null,
    assignee: 'Текущий пользователь',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      taskName: formData.name,
      description: formData.description,
      status: formData.status === 'To_Do' ? 0 : formData.status === 'To_Progress' ? 1 : 2,
      priority: formData.priority === 'Low' ? 0 : formData.priority === 'Medium' ? 1 : 2,
      deadline: formData.dueDate,
      projectId: selectedProject,
      userId: 1 // Устанавливаем пользователя по умолчанию
    };
    onAddTask(taskData);
    setFormData({
      name: '',
      description: '',
      status: 'To_Do',
      priority: 'Low',
      dueDate: null,
      assignee: 'Текущий пользователь', // Устанавливаем имя пользователя по умолчанию
    });
    onClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="backdrop-blur-sm"
      PaperProps={{
        className: "rounded-xl backdrop-blur-sm bg-opacity-80",
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        <Box className="flex items-center space-x-2">
          <AssignmentIcon className="text-primary" />
          <Typography variant="h5" className="font-bold text-primary">
            Новая задача
          </Typography>
        </Box>
        <IconButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="space-y-4">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Название задачи"
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
                      <AssignmentIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Описание задачи"
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Статус</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Статус"
                >
                  <MenuItem value="To_Do">К выполнению</MenuItem>
                  <MenuItem value="To_Progress">В процессе</MenuItem>
                  <MenuItem value="Done">Выполнено</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Приоритет</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  label="Приоритет"
                >
                  <MenuItem value="Low">Низкий</MenuItem>
                  <MenuItem value="Medium">Средний</MenuItem>
                  <MenuItem value="High">Высокий</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
                <DatePicker
                  label="Срок выполнения"
                  value={formData.dueDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      className="rounded-lg"
                      InputProps={{
                        ...params.InputProps,
                        className: "rounded-lg",
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon className="text-gray-400" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Исполнитель"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
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
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Создать задачу
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
