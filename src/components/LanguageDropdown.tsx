
import { motion } from 'framer-motion';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageDropdownProps {
  languages: Language[];
  currentLanguage: string;
  onSelect: (code: string) => void;
  onClose: () => void;
}

export default function LanguageDropdown({ languages, currentLanguage, onSelect, onClose }: LanguageDropdownProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-800 border border-slate-700 shadow-lg overflow-hidden z-50"
      >
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-slate-700 transition-colors ${
              currentLanguage === lang.code ? 'bg-slate-700/50' : ''
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </motion.div>
    </>
  );
}