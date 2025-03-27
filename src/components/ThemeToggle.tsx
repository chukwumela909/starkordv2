
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        theme === 'dark' 
          ? 'bg-slate-800 hover:bg-slate-700' 
          : 'bg-slate-200 hover:bg-slate-300'
      }`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </motion.button>
  );
}