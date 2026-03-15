import { useState, useEffect, useContext } from 'react';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

// Import screens
import { LoginScreen } from './components/screens/LoginScreen';
import { TwoFactorScreen } from './components/screens/TwoFactorScreen';
import { TasksScreen } from './components/screens/TasksScreen';
import { Header } from './components/app/Header';
import { Footer } from './components/app/Footer';
import DesignSystemPanel from './components/DesignSystemPanel';
import { DevModeOverlay } from './components/DevModeOverlay';

// Initial data constants for reset functionality
const initialTasks = [
  { id: 1, name: 'UX/UI Improvements...', project: 'Website Redesign', projectId: 1, seconds: 1805, isFavorite: false },
  { id: 2, name: 'General - Development', project: 'Website Redesign', projectId: 1, seconds: 2160, isFavorite: false },
  { id: 3, name: 'Meetings & Communication', project: 'Website Redesign', projectId: 1, seconds: 4868, isFavorite: false },
  { id: 4, name: 'TimeOff - New Feature...', project: 'Mobile App', projectId: 2, seconds: 67, isFavorite: false },
];

const initialProjects = [
  { id: 1, name: 'Website Redesign', color: '#075BEC', initials: 'W', isFavorite: false },
  { id: 2, name: 'Mobile App', color: '#8A3AFB', initials: 'M', isFavorite: false },
  { id: 3, name: 'Marketing Campaign', color: '#00EFD3', initials: 'MC', isFavorite: false },
];

function AppContent() {
  const { theme, isDarkMode, toggleTheme, setCustomColors, resetToDefaultTheme } = useContext(ThemeContext);

  // ===== SIMPLE STATE =====
  const [screen, setScreen] = useState('login'); // 'login' | '2fa' | 'tasks' | 'settings' | 'projectDetail'
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'projects'
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // 2FA state
  const [show2FA, setShow2FA] = useState(false);
  const [twoFAError, setTwoFAError] = useState(null); // 'invalid' | 'expired' | null

  // Data state - Initialize from localStorage or defaults
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('staffco-tasks');
    return saved ? JSON.parse(saved) : [...initialTasks];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('staffco-projects');
    return saved ? JSON.parse(saved) : [...initialProjects];
  });

  // Timer state
  const [activeTask, setActiveTask] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Developer Mode state
  const [devMode, setDevMode] = useState(false);
  const [notification, setNotification] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('staffco-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('staffco-projects', JSON.stringify(projects));
  }, [projects]);

  // ===== DEBUG LOGGING =====
  useEffect(() => {
    console.log('======= APP STATE =======');
    console.log('screen:', screen);
    console.log('selectedProject:', selectedProject);
    console.log('activeTab:', activeTab);
    console.log('tasks:', tasks);
    console.log('projects:', projects);
    console.log('theme:', theme);
    console.log('=========================');
  }, [screen, selectedProject, activeTab]);

  // ===== NAVIGATION FUNCTIONS =====
  const goToLogin = () => {
    console.log('→ Going to login');
    setScreen('login');
  };

  const goToTasks = () => {
    console.log('→ Going to tasks');
    setScreen('tasks');
  };

  const goToSettings = () => {
    console.log('→ Going to settings');
    setScreen('settings');
  };

  const goToProjectDetail = (project) => {
    console.log('→ Going to project:', project);
    setSelectedProject(project);
    setScreen('projectDetail');
  };

  const goBack = () => {
    console.log('← Going back from:', screen);
    if (screen === 'settings') {
      setScreen('tasks');
    } else if (screen === 'projectDetail') {
      setSelectedProject(null);
      setScreen('tasks');
      setActiveTab('projects');
    }
  };

  // ===== HANDLERS =====
  const handleLogin = () => {
    // After successful email/password, show 2FA
    setShow2FA(true);
    setTwoFAError(null);
    setScreen('2fa');
  };

  const handleVerify2FA = (code) => {
    // Demo: check if code is "123456" for success
    if (code === '123456') {
      setTwoFAError(null);
      setShow2FA(false);
      setScreen('tasks');
    } else if (code === '000000') {
      setTwoFAError('expired');
    } else {
      setTwoFAError('invalid');
    }
  };

  const handleBackupCode = (code) => {
    console.log('Backup code:', code);
    // Demo: accept any backup code
    setTwoFAError(null);
    setShow2FA(false);
    setScreen('tasks');
  };

  const handleRegister = () => {
    console.log('Register clicked - would navigate to registration');
    // For now, just log - could add registration screen later
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked - would navigate to password reset');
    // For now, just log - could add password reset screen later
  };

  const handleLogout = () => {
    // Stop active task and save
    if (activeTask) {
      handleStopTask();
    }
    setScreen('login');
    setShow2FA(false);
    setTwoFAError(null);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTask = (taskId) => {
    console.log('▶ Starting task:', taskId);
    // If there's an active task, save its time first
    if (activeTask) {
      setTasks(prev => prev.map(task =>
        task.id === activeTask.id
          ? { ...task, seconds: (task.seconds || 0) + elapsedSeconds }
          : task
      ));
    }

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setActiveTask(task);
      setTimerRunning(true);
      setElapsedSeconds(0);
    }
  };

  const handleStopTask = () => {
    console.log('⏸ Stopping task');
    if (activeTask) {
      setTasks(prev => prev.map(t =>
        t.id === activeTask.id
          ? { ...t, seconds: (t.seconds || 0) + elapsedSeconds }
          : t
      ));
    }
    setActiveTask(null);
    setTimerRunning(false);
    setElapsedSeconds(0);
  };

  const handleToggleFavorite = (taskId) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  const handleToggleProjectFavorite = (projectId) => {
    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, isFavorite: !project.isFavorite }
        : project
    ));
  };

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      project: projects.find(p => p.id === taskData.projectId)?.name || 'Website Redesign',
      projectId: taskData.projectId,
      seconds: 0,
      isFavorite: false,
    };
    setTasks(prev => [...prev, newTask]);
    setShowAddTaskModal(false);
  };

  const handleResetDemo = () => {
    const confirmed = window.confirm(
      'Reset demo?\n\nThis will:\n• Stop the timer\n• Clear all favorites\n• Reset task times\n• Reset colors to default\n• Return to Tasks screen\n\nThis action cannot be undone.'
    );

    if (!confirmed) return;

    // Stop timer
    setTimerRunning(false);
    setElapsedSeconds(0);

    // Reset active task
    setActiveTask(null);

    // Reset tasks to initial state
    setTasks([...initialTasks]);

    // Reset projects to initial state
    setProjects([...initialProjects]);

    // Reset navigation
    setScreen('tasks');
    setActiveTab('tasks');
    setSelectedProject(null);

    // Reset colors to default
    resetToDefaultTheme();

    // Clear localStorage
    localStorage.removeItem('staffco-tasks');
    localStorage.removeItem('staffco-projects');
    localStorage.removeItem('staffco-custom-colors');

    // Close any open modals
    setShowAddTaskModal(false);

    console.log('✅ Demo reset complete');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // ===== RENDER CURRENT SCREEN =====
  const renderScreen = () => {
    console.log('🎬 renderScreen called, screen =', screen);

    switch (screen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onRegister={handleRegister}
            onForgotPassword={handleForgotPassword}
          />
        );

      case '2fa':
        return (
          <TwoFactorScreen
            onVerify={handleVerify2FA}
            onBack={() => setScreen('login')}
            onBackupCode={handleBackupCode}
            error={twoFAError}
          />
        );

      case 'tasks':
        return (
          <TasksScreen
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
            onProjectClick={goToProjectDetail}
            showAddTaskModal={showAddTaskModal}
            onOpenAddTaskModal={() => setShowAddTaskModal(true)}
            onCloseAddTaskModal={() => setShowAddTaskModal(false)}
            onAddTask={handleAddTask}
          />
        );

      case 'projectDetail':
        console.log('📊 Rendering projectDetail, selectedProject:', selectedProject);
        return (
          <ProjectDetailContent
            project={selectedProject}
            tasks={tasks}
            activeTask={activeTask}
            timerRunning={timerRunning}
            elapsedSeconds={elapsedSeconds}
            formatTime={formatTime}
            onStartTask={handleStartTask}
            onStopTask={handleStopTask}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'settings':
        console.log('⚙️ Rendering settings');
        return <SettingsContent />;

      default:
        return <div style={{ color: 'white', padding: 20 }}>Unknown screen: {screen}</div>;
    }
  };

  // Show header on all screens except login and 2FA
  const showHeader = screen !== 'login' && screen !== '2fa';
  const showBackButton = screen === 'settings' || screen === 'projectDetail';

  const getBackText = () => {
    if (screen === 'settings') return 'Back';
    if (screen === 'projectDetail') return 'Back to Projects';
    return '';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: isDarkMode
          ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
          : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* App Window */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '92vh',
          minHeight: '700px',
          maxHeight: '950px',
          borderRadius: '20px',
          overflow: 'hidden',
          background: theme?.app?.windowBg || '#111827',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          border: `1px solid ${theme?.app?.border || '#334155'}`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            background: isDarkMode ? '#1E293B' : '#FFFFFF',
            borderBottom: `1px solid ${theme?.app?.border || '#334155'}`,
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', left: '16px', display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28CA41' }} />
          </div>
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: theme?.app?.textSecondary || '#94A3B8',
            marginLeft: '72px',
          }}>
            talyvn
          </span>
        </div>

        {/* Header */}
        {showHeader && (
          <Header
            showBackButton={showBackButton}
            backButtonText={getBackText()}
            onBackClick={goBack}
            onSettingsClick={goToSettings}
            onLogout={handleLogout}
          />
        )}

        {/* Main content area */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {renderScreen()}
        </div>

        {/* Footer */}
        {showHeader && <Footer />}
      </div>

      {/* Design System Panel */}
      <DesignSystemPanel
        colors={theme}
        setColors={setCustomColors}
        isDarkMode={isDarkMode}
        setIsDarkMode={toggleTheme}
        onReset={resetToDefaultTheme}
        onResetDemo={handleResetDemo}
        devMode={devMode}
        setDevMode={setDevMode}
      />

      {/* Developer Mode Overlay */}
      <DevModeOverlay enabled={devMode} onNotification={showNotification} />

      {/* Notification Toast */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#10B981',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 10000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          ✓ {notification}
        </div>
      )}
    </div>
  );
}

// ===== INLINE COMPONENTS FOR DEBUGGING =====

// Simple Settings component - inline to avoid import issues
function SettingsContent() {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  // Add state for toggles
  const [launchAtStartup, setLaunchAtStartup] = useState(true);
  const [alwaysOnTimer, setAlwaysOnTimer] = useState(true);

  console.log('⚙️ SettingsContent rendering, theme:', theme);
  console.log('⚙️ isDarkMode:', isDarkMode);
  console.log('⚙️ theme.app:', theme?.app);

  if (!theme || !theme.app) {
    return <div style={{ color: 'white', padding: 20 }}>Theme loading...</div>;
  }

  return (
    <div style={{
      padding: '20px',
      overflowY: 'auto',
      flex: 1,
      background: theme.app.windowBg,
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: theme.app.textPrimary,
        marginBottom: '8px',
      }}>
        Settings
      </h1>
      <p style={{
        fontSize: '14px',
        color: theme.app.textSecondary,
        marginBottom: '24px',
      }}>
        Configure how the app works for you
      </p>

      {/* Settings Card */}
      <div style={{
        background: theme.app.cardBg,
        borderRadius: '16px',
        border: `1px solid ${theme.app.border}`,
        overflow: 'hidden',
      }}>
        {/* Launch at Startup - WORKING TOGGLE */}
        <div style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.app.border}`,
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: theme.app.textPrimary }}>
              Launch at Startup
            </div>
            <div style={{ fontSize: '12px', color: theme.app.textSecondary, marginTop: '2px' }}>
              Auto start when computer boots
            </div>
          </div>

          {/* Toggle - clickable */}
          <button
            onClick={() => setLaunchAtStartup(!launchAtStartup)}
            style={{
              width: '52px',
              height: '28px',
              borderRadius: '14px',
              padding: '2px',
              border: 'none',
              cursor: 'pointer',
              background: launchAtStartup
                ? 'linear-gradient(135deg, #60A5FA, #3B82F6)'
                : 'rgba(71, 85, 105, 0.5)',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease',
                transform: launchAtStartup ? 'translateX(24px)' : 'translateX(0)',
              }}
            />
          </button>
        </div>

        {/* Always-On Timer - WORKING TOGGLE */}
        <div style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: theme.app.textPrimary }}>
              Always-On Timer
            </div>
            <div style={{ fontSize: '12px', color: theme.app.textSecondary, marginTop: '2px' }}>
              Small floating timer widget
            </div>
          </div>

          {/* Toggle - clickable */}
          <button
            onClick={() => setAlwaysOnTimer(!alwaysOnTimer)}
            style={{
              width: '52px',
              height: '28px',
              borderRadius: '14px',
              padding: '2px',
              border: 'none',
              cursor: 'pointer',
              background: alwaysOnTimer
                ? 'linear-gradient(135deg, #60A5FA, #3B82F6)'
                : 'rgba(71, 85, 105, 0.5)',
              transition: 'all 0.3s ease',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                background: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease',
                transform: alwaysOnTimer ? 'translateX(24px)' : 'translateX(0)',
              }}
            />
          </button>
        </div>
      </div>

      {/* Theme Card */}
      <div style={{
        marginTop: '16px',
        background: theme.app.cardBg,
        borderRadius: '16px',
        border: `1px solid ${theme.app.border}`,
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: theme.app.textPrimary }}>
            Appearance
          </div>
          <div style={{ fontSize: '12px', color: theme.app.textSecondary, marginTop: '2px' }}>
            Choose theme
          </div>
        </div>

        {/* Theme toggle buttons */}
        <div style={{
          display: 'flex',
          background: theme.app.elevatedBg,
          borderRadius: '10px',
          overflow: 'hidden',
          border: `1px solid ${theme.app.border}`,
        }}>
          <button
            onClick={() => isDarkMode && toggleTheme()}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: !isDarkMode ? 'linear-gradient(135deg, #60A5FA, #3B82F6)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'all 0.2s ease',
            }}
          >
            ☀️
          </button>
          <button
            onClick={() => !isDarkMode && toggleTheme()}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDarkMode ? 'linear-gradient(135deg, #60A5FA, #3B82F6)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'all 0.2s ease',
            }}
          >
            🌙
          </button>
        </div>
      </div>
    </div>
  );
}

// Simple ProjectDetail component - inline to avoid import issues
function ProjectDetailContent({
  project,
  tasks = [],
  activeTask,
  formatTime,
  onStartTask,
  onStopTask,
  onToggleFavorite,
  elapsedSeconds = 0,
}) {
  const { theme } = useContext(ThemeContext);

  console.log('📊 ProjectDetailContent rendering');
  console.log('📊 project:', project);
  console.log('📊 tasks:', tasks);
  console.log('📊 theme:', theme);

  if (!theme || !theme.app) {
    return <div style={{ color: 'white', padding: 20 }}>Theme loading...</div>;
  }

  if (!project) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: theme.app.textMuted,
      }}>
        No project selected
      </div>
    );
  }

  // Filter tasks for this project
  const projectTasks = Array.isArray(tasks)
    ? tasks.filter(t => t?.projectId === project.id)
    : [];

  console.log('📊 projectTasks filtered:', projectTasks);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: theme.app.windowBg,
    }}>
      {/* Project Header */}
      <div
        style={{
          margin: '20px 20px 16px',
          padding: '20px',
          borderRadius: '16px',
          background: theme.app.gradients?.cardGlass || theme.app.cardBg,
          border: `1px solid ${theme.app.border}`,
          backdropFilter: 'blur(10px)',
          boxShadow: theme.app.shadows?.card || '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: project.color,
              color: 'white',
              fontWeight: 600,
              fontSize: '18px',
            }}
          >
            {project.initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: theme.app.textPrimary }}>
              {project.name}
            </div>
            <div style={{ fontSize: '12px', color: theme.app.textSecondary, marginTop: '2px' }}>
              {projectTasks.length} {projectTasks.length === 1 ? 'task' : 'tasks'}
            </div>
          </div>
        </div>
      </div>

      {/* Search + Add Task */}
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: '0 20px 16px',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          borderRadius: '14px',
          background: theme.app.cardBg,
          border: `1px solid ${theme.app.border}`,
        }}>
          <span style={{ color: theme.app.textMuted }}>🔍</span>
          <input
            placeholder="Search by task"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: theme.app.textPrimary,
            }}
          />
        </div>

        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
          color: 'white',
          border: 'none',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          + Add task
        </button>
      </div>

      {/* Tasks list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 20px 20px',
      }}>
        {projectTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 20px',
            color: theme.app.textMuted,
          }}>
            <p style={{ fontSize: '14px' }}>No tasks in this project yet</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Click "Add task" to create one</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projectTasks.map(task => {
              const isActive = task.id === activeTask?.id;
              const totalSeconds = isActive
                ? (task.seconds || 0) + elapsedSeconds
                : (task.seconds || 0);
              const timeDisplay = formatTime ? formatTime(totalSeconds) : '00:00:00';

              return (
                <div
                  key={task.id}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '16px',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(16, 185, 129, 0.08))'
                      : theme.app.gradients?.cardGlass || theme.app.cardBg,
                    border: `1px solid ${isActive ? 'rgba(52, 211, 153, 0.3)' : theme.app.border}`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme.app.shadows?.card || '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Star */}
                  <button
                    onClick={() => onToggleFavorite && onToggleFavorite(task.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                    }}
                  >
                    {task.isFavorite ? '⭐' : '☆'}
                  </button>

                  {/* Task name */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: theme.app.textPrimary,
                    }}>
                      {task.name}
                    </div>
                  </div>

                  {/* Time */}
                  {isActive ? (
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #34D399, #10B981)',
                        color: 'white',
                        fontFamily: 'SF Mono, monospace',
                        boxShadow: '0 2px 8px rgba(52, 211, 153, 0.3)',
                      }}
                    >
                      {timeDisplay}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '14px',
                        color: theme.app.textSecondary,
                        fontFamily: 'SF Mono, monospace',
                      }}
                    >
                      {timeDisplay}
                    </span>
                  )}

                  {/* Play/Pause */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => isActive ? onStopTask() : onStartTask(task.id)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: isActive
                        ? 'linear-gradient(135deg, #F87171, #EF4444)'
                        : 'linear-gradient(135deg, #60A5FA, #3B82F6)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      boxShadow: isActive
                        ? '0 4px 12px rgba(248, 113, 113, 0.3)'
                        : '0 4px 12px rgba(96, 165, 250, 0.3)',
                    }}
                  >
                    {isActive ? '⏸' : '▶'}
                  </motion.button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Main App wrapper
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
