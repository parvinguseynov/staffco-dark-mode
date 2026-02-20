import { useState, useContext } from 'react';
import { Eye, Chrome } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

function Logo() {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)' }}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M5 3h6v6H5V3z" fill="white" opacity="0.9" />
          <path d="M13 3h6v6h-6V3z" fill="white" opacity="0.7" />
          <path d="M5 13h6v6H5v-6z" fill="white" opacity="0.5" />
          <path d="M13 13h6v6h-6v-6z" fill="white" opacity="0.6" />
        </svg>
      </div>
      <span className="text-xl font-semibold">StaffCo</span>
    </div>
  );
}

export function LoginScreen({ onLogin }) {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex flex-col h-full p-5" style={{ background: theme.app.windowBg, color: theme.app.textPrimary }}>
      <Logo />

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to StaffCo</h1>
        <p className="text-sm" style={{ color: theme.app.textSecondary }}>
          Enter your email and password...
        </p>
      </div>

      <div className="space-y-4 mb-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Eye size={16} />}
        />
      </div>

      <div className="flex items-center justify-between mb-4 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span style={{ color: theme.app.textSecondary }}>Remember me</span>
        </label>
        <a href="#" style={{ color: theme.app.accentBlue }}>Forgot password?</a>
      </div>

      <Button onClick={onLogin} className="w-full mb-4">Sign in</Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" style={{ borderColor: theme.app.border }} />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2" style={{ background: theme.app.windowBg, color: theme.app.textMuted }}>
            Or login with
          </span>
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full"
        icon={<Chrome size={18} />}
        onClick={onLogin}
      >
        Google
      </Button>
    </div>
  );
}
