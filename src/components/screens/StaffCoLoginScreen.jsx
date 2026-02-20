import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chrome, Github, ExternalLink } from 'lucide-react';
import { StaffCoLogo } from '../ui/StaffCoLogo';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function StaffCoLoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Logo Header */}
      <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
        <StaffCoLogo size="md" showText={true} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Welcome to StaffCo
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email and password to continue.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!bg-white dark:!bg-gray-800"
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!bg-white dark:!bg-gray-800"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full !bg-blue-600 hover:!bg-blue-700">
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                Or login with
              </span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={onLogin}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Chrome size={20} className="text-red-500" />
              <span className="text-gray-700 dark:text-gray-300">Google</span>
            </button>
            <button
              onClick={onLogin}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Github size={20} className="text-gray-700 dark:text-gray-300" />
              <span className="text-gray-700 dark:text-gray-300">Github</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Register
            </a>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm text-gray-500">v1.0.3</span>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onLogin(); }}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          Open Dashboard
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
