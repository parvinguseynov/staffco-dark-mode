import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Desktop } from './components/macos/Desktop';
import { MenuBar } from './components/macos/MenuBar';
import { AppWindow } from './components/window/AppWindow';
import { Header } from './components/app/Header';
import { Footer } from './components/app/Footer';
import { TasksScreen } from './components/screens/TasksScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { CompanyScreen } from './components/screens/CompanyScreen';
import { ProjectDetailScreen } from './components/screens/ProjectDetailScreen';

function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState('tasks');
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Initialize tasks from localStorage or defaults
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('staffco-tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'UX/UI Improvements...', project: 'StaffCo', projectId: 1, seconds: 1805, isFavorite: false },
      { id: 2, name: 'General - StaffCo', project: 'StaffCo', projectId: 1, seconds: 2160, isFavorite: false },
      { id: 3, name: 'Meetings & Communication', project: 'StaffCo', projectId: 1, seconds: 4868, isFavorite: false },
      { id: 4, name: 'TimeOff - New Feature...', project: 'StaffCo', projectId: 1, seconds: 67, isFavorite: false },
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('staffco-projects');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'StaffCo', color: '#34D399', initials: 'S', isFavorite: false },
      { id: 2, name: 'Paid Time Off (Only HR...', color: '#A78BFA', initials: 'P', isFavorite: false },
      { id: 3, name: 'BP - BitPlay', color: '#F472B6', initials: 'B', isFavorite: false },
    ];
  });

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('staffco-projects', JSON.stringify(projects));
  }, [projects]);

  // Timer state
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('staffco-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Timer effect - counts up every second when running
  useEffect(() => {
    let interval;
    if (timerRunning && activeTaskId) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, activeTaskId]);

  // Helper: Format seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer handlers
  const handleStartTask = (taskId) => {
    // If there's an active task, save its time first
    if (activeTaskId) {
      setTasks(prev => prev.map(task =>
        task.id === activeTaskId
          ? { ...task, seconds: task.seconds + elapsedSeconds }
          : task
      ));
    }

    // Start the new task
    const task = tasks.find(t => t.id === taskId);
    setActiveTaskId(taskId);
    setElapsedSeconds(0);
    setTimerRunning(true);
  };

  const handleStopTask = () => {
    if (activeTaskId) {
      // Save the accumulated time
      setTasks(prev => prev.map(task =>
        task.id === activeTaskId
          ? { ...task, seconds: task.seconds + elapsedSeconds }
          : task
      ));
      setActiveTaskId(null);
      setTimerRunning(false);
      setElapsedSeconds(0);
    }
  };

  // Favorites handlers
  const handleToggleFavorite = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, isFavorite: !task.isFavorite }
        : task
    ));
  };

  const handleToggleProjectFavorite = (projectId) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, isFavorite: !project.isFavorite }
        : project
    ));
  };

  // Add task handler
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      project: projects.find(p => p.id === taskData.projectId)?.name || 'StaffCo',
      projectId: taskData.projectId,
      seconds: 0,
      isFavorite: false,
    };
    setTasks(prev => [...prev, newTask]);
    setShowAddTaskModal(false);
  };

  // Navigation handlers
  const handleLogin = () => {
    setCurrentScreen('company');
  };

  const handleSelectCompany = () => {
    setCurrentScreen('tasks');
  };

  const handleSettingsClick = () => {
    setCurrentScreen('settings');
  };

  const handleUserAvatarClick = () => {
    setCurrentScreen('company');
  };

  const handleBackClick = () => {
    if (currentScreen === 'projectDetail') {
      setCurrentScreen('tasks');
      setActiveTab('projects');
      setSelectedProject(null);
    } else if (currentScreen === 'settings') {
      setCurrentScreen('tasks');
    } else if (currentScreen === 'company') {
      setCurrentScreen('login');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentScreen('projectDetail');
  };

  const handleLogout = () => {
    // Stop active task and save
    if (activeTaskId) {
      handleStopTask();
    }
    // Navigate to login
    setCurrentScreen('login');
  };

  const showHeader = !['login', 'company'].includes(currentScreen);
  const showBackButton = ['settings', 'company', 'projectDetail'].includes(currentScreen);

  // Back button text based on current screen
  const getBackButtonText = () => {
    if (currentScreen === 'projectDetail') return 'Back to Projects';
    if (currentScreen === 'settings') return 'Back';
    if (currentScreen === 'company') return 'Back';
    return 'Back';
  };

  // Get active task object
  const activeTask = activeTaskId ? tasks.find(t => t.id === activeTaskId) : null;

  return (
    <Desktop>
      <MenuBar />

      <AppWindow>
        {showHeader && (
          <Header
            onSettingsClick={handleSettingsClick}
            onUserAvatarClick={handleUserAvatarClick}
            showBackButton={showBackButton}
            onBackClick={handleBackClick}
            onLogout={handleLogout}
            backButtonText={getBackButtonText()}
          />
        )}

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <LoginScreen onLogin={handleLogin} />
              </motion.div>
            )}

            {currentScreen === 'company' && (
              <motion.div
                key="company"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <CompanyScreen
                  onSelectCompany={handleSelectCompany}
                  onBackClick={handleBackClick}
                />
              </motion.div>
            )}

            {currentScreen === 'tasks' && (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <TasksScreen
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  tasks={tasks}
                  projects={projects}
                  activeTask={activeTask}
                  timerRunning={timerRunning}
                  elapsedSeconds={elapsedSeconds}
                  formatTime={formatTime}
                  onStartTask={handleStartTask}
                  onStopTask={handleStopTask}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleProjectFavorite={handleToggleProjectFavorite}
                  onProjectClick={handleProjectClick}
                  showAddTaskModal={showAddTaskModal}
                  onOpenAddTaskModal={() => setShowAddTaskModal(true)}
                  onCloseAddTaskModal={() => setShowAddTaskModal(false)}
                  onAddTask={handleAddTask}
                />
              </motion.div>
            )}

            {currentScreen === 'projectDetail' && (
              <motion.div
                key="projectDetail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ProjectDetailScreen
                  project={selectedProject}
                  tasks={tasks.filter(t => t.projectId === selectedProject?.id)}
                  activeTask={activeTask}
                  timerRunning={timerRunning}
                  elapsedSeconds={elapsedSeconds}
                  formatTime={formatTime}
                  onStartTask={handleStartTask}
                  onStopTask={handleStopTask}
                  onToggleFavorite={handleToggleFavorite}
                  showAddTaskModal={showAddTaskModal}
                  onOpenAddTaskModal={() => setShowAddTaskModal(true)}
                  onCloseAddTaskModal={() => setShowAddTaskModal(false)}
                  onAddTask={handleAddTask}
                />
              </motion.div>
            )}

            {currentScreen === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <SettingsScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showHeader && <Footer />}
      </AppWindow>
    </Desktop>
  );
}

export default App;
