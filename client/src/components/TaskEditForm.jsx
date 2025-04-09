import React, { useState, useEffect } from 'react';
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
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  PriorityHigh as PriorityIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

const TaskEditForm = ({ open, onClose, onSaveTask, task }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'To_Do',
    priority: 'Low',
    dueDate: null,
    assignee: '',
  });

  // Заполняем форму данными задачи при открытии
  useEffect(() => {
    if (task && open) {
      // Извлекаем assignee из описания
      let assignee = '';
      if (task.description) {
        const match = task.description.match(/Исполнитель: (.*?)(?:\n|$)/);
        if (match) assignee = match[1];
      }

      // Очищаем описание от строки исполнителя
      let description = task.description || '';
      description = description.replace(/Исполнитель: .*(?:\n|$)/, '').trim();

      setFormData({
        name: task.taskName || '',
        description: description,
        status: task.status === 0 
          ? 'To_Do' 
          : task.status === 1 
            ? 'To_Progress' 
            : 'Done',
        priority: task.priority === 0 
          ? 'Low' 
          : task.priority === 1 
            ? 'Medium' 
            : 'High',
        dueDate: task.deadline ? new Date(task.deadline) : null,
        assignee: assignee,
      });
    }
  }, [task, open]);

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
    
    // Не редактируем поля userId и projectId
    const updatedTask = {
      id: task.id,
      taskName: formData.name,
      description: formData.description + (formData.assignee ? `\nИсполнитель: ${formData.assignee}` : ''),
      status: formData.status === 'To_Do' ? 0 : formData.status === 'To_Progress' ? 1 : 2,
      priority: formData.priority === 'Low' ? 0 : formData.priority === 'Medium' ? 1 : 2,
      deadline: formData.dueDate,
      projectId: task.projectId,
      userId: task.userId || 1,
    };
    
    onSaveTask(updatedTask);
    onClose();
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
          <EditIcon className="text-primary" />
          <Typography variant="h5" className="font-bold text-primary">
            Редактирование задачи
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
                placeholder="Введите имя исполнителя"
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
            Сохранить изменения
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskEditForm; 