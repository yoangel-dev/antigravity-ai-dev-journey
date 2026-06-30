import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="btn-dark-mode-toggle"
      onClick={toggleTheme}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-pressed={isDark}
      aria-label="Alternar modo oscuro"
      className="flex items-center gap-1.5 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005da9] rounded-full"
    >
      {/* Sun icon */}
      <Sun
        size={13}
        className={`transition-all duration-300 ${
          isDark ? 'text-[var(--text-muted)] opacity-50' : 'text-amber-500 opacity-100'
        }`}
      />

      {/* Track */}
      <div
        className={`theme-toggle__track ${isDark ? 'active' : ''}`}
        style={{ flexShrink: 0 }}
      >
        {/* Animated thumb */}
        <motion.div
          className="theme-toggle__thumb"
          animate={{ x: isDark ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {/* Tiny inner icon in thumb */}
          {isDark ? (
            <Moon size={10} className="text-indigo-400" />
          ) : (
            <Sun size={10} className="text-amber-400" />
          )}
        </motion.div>
      </div>

      {/* Moon icon */}
      <Moon
        size={13}
        className={`transition-all duration-300 ${
          isDark ? 'text-indigo-400 opacity-100' : 'text-[var(--text-muted)] opacity-50'
        }`}
      />
    </button>
  );
}
