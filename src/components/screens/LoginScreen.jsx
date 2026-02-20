import { useState, useContext } from 'react';
import { Eye, Chrome } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { darkTheme, lightTheme } from '../../theme/colors';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

function Logo() {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      <img
        src="/logo.png"
        alt="StaffCo"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          objectFit: 'contain',
        }}
      />
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
