import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Fade,
  Zoom,
  Fab,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ViewKanban as ViewKanbanIcon,
  ViewList as ViewListIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";
import Projects from "../components/Projects";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import KanbanBoard from "../components/KanbanBoard";

// Основной компонент, который принимает пропсы:
// tasks — список задач
// selectedProject — текущий выбранный проект
// setSelectedProject — функция для изменения выбранного проекта
// handleAddTask — функция для добавления задач
// showProjects — флаг для отображения списка проектов
// showTasks — флаг для отображения задач
// setTasks — функция для обновления списка задач
// showNotification — флаг для отображения уведомления
const MainContent = ({
  tasks,
  selectedProject,
  setSelectedProject,
  handleAddTask,
  showProjects,
  showTasks,
  setTasks,
  showNotification,
}) => {
  const [viewMode, setViewMode] = useState("kanban");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const actions = [
    { icon: <AssignmentIcon />, name: "Новая задача", action: () => setIsTaskFormOpen(true) },
    { icon: <ViewKanbanIcon />, name: "Канбан", action: () => setViewMode("kanban") },
    { icon: <ViewListIcon />, name: "Список", action: () => setViewMode("list") },
  ];

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  const handleViewChange = (event, newValue) => {
    setViewMode(newValue);
  };

  return (
    <Box className="space-y-6">
      {showProjects && (
        <Fade in={showProjects} timeout={500}>
          <Paper className="p-6 backdrop-blur-sm bg-opacity-80">
          
            <Projects
              onSelectProject={setSelectedProject}
              selectedProject={selectedProject}
              showNotification={showNotification}
            />
          </Paper>
        </Fade>
      )}

      {selectedProject && showTasks && (
        <Box className="space-y-6">
          <Fade in={true} timeout={500}>
            <Paper className="p-4 backdrop-blur-sm bg-opacity-80">
              <Box className="flex justify-between items-center mb-4">
                <Typography 
                  variant="h5" 
                  className="font-semibold"
                  sx={{
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                      : 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  Задачи проекта
                </Typography>
                {!isMobile && (
                  <Box className="flex items-center space-x-2">
                    <Tabs
                      value={viewMode}
                      onChange={handleViewChange}
                      className="bg-opacity-50"
                    >
                      <Tab
                        icon={<ViewKanbanIcon />}
                        label="Канбан"
                        value="kanban"
                        className="transition-all duration-200"
                      />
                      <Tab
                        icon={<ViewListIcon />}
                        label="Список"
                        value="list"
                        className="transition-all duration-200"
                      />
                    </Tabs>
                    <Fab
                      color="primary"
                      aria-label="add"
                      onClick={() => setIsTaskFormOpen(true)}
                      className="ml-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <AddIcon />
                    </Fab>
                  </Box>
                )}
              </Box>

              <Zoom in={viewMode === "list"} mountOnEnter unmountOnExit>
                <Box className={viewMode === "list" ? "block" : "hidden"}>
                  <TaskList
                    tasks={tasks.filter((task) => task.projectId === selectedProject)}
                    setTasks={setTasks}
                    showNotification={showNotification}
                  />
                </Box>
              </Zoom>

              <Zoom in={viewMode === "kanban"} mountOnEnter unmountOnExit>
                <Box className={viewMode === "kanban" ? "block" : "hidden"}>
                  <KanbanBoard
                    tasks={tasks}
                    setTasks={setTasks}
                    showNotification={showNotification}
                  />
                </Box>
              </Zoom>
            </Paper>
          </Fade>

          <TaskForm
            open={isTaskFormOpen}
            onClose={handleCloseTaskForm}
            onAddTask={handleAddTask}
            selectedProject={selectedProject}
            showNotification={showNotification}
          />

          {isMobile && (
            <SpeedDial
              ariaLabel="Меню задач"
              className="fixed bottom-6 right-6"
              icon={<SpeedDialIcon />}
              FabProps={{
                className: "bg-primary shadow-lg hover:shadow-xl transition-all duration-300",
              }}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.action}
                  className="bg-white hover:bg-gray-100"
                />
              ))}
            </SpeedDial>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MainContent;
