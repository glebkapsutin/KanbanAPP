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
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

// Компонент формы для добавления нового проекта
const ProjectForm = ({ open, onClose, onAddProject }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject(formData);
    setFormData({ name: '', description: '' });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className="backdrop-blur-sm"
      PaperProps={{
        className: "rounded-xl backdrop-blur-sm bg-opacity-80",
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        <Typography variant="h5" className="font-bold text-primary">
          Новый проект
        </Typography>
        <IconButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent className="space-y-4">
          <TextField
            fullWidth
            label="Название проекта"
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
          <TextField
            fullWidth
            label="Описание проекта"
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
            Создать проект
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectForm;
