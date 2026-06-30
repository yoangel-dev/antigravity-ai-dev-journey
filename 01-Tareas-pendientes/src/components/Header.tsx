import { Bell, Settings, Droplet } from 'lucide-react';
import { Screen, Profile } from '../types';
import DarkModeToggle from './DarkModeToggle';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen, transitionType?: 'push' | 'push_back') => void;
  profile: Profile;
}

export default function Header({ currentScreen, onNavigate, profile }: HeaderProps) {
  const { isDark } = useTheme();

  const handleLogoClick = () => {
    if (currentScreen === 'profile') {
      onNavigate('tasks', 'push_back');
    } else {
      onNavigate('tasks');
    }
  };

  const handleSettingsClick = () => {
    if (currentScreen !== 'profile') {
      onNavigate('profile', 'push');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 z-50 flex justify-between items-center px-6 shadow-sm border-b select-none transition-colors duration-300 ${
        isDark
          ? 'bg-[var(--surface)] border-[var(--border)]'
          : 'bg-white border-[#e0e2ea]'
      }`}
    >
      {/* Brand logo */}
      <div
        id="header-brand-logo"
        onClick={handleLogoClick}
        className="flex items-center gap-2 cursor-pointer group active:scale-98 transition-transform"
      >
        <span className="text-[var(--brand)] flex items-center justify-center">
          <Droplet size={24} className="fill-[var(--brand)]/10 group-hover:scale-110 transition-transform" />
        </span>
        <span className="font-extrabold text-lg text-[var(--brand)] md:text-xl">
          Crimson Flow
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">

        {/* ── Dark mode toggle ──────────────────────────────────────── */}
        <DarkModeToggle />

        {/* Divider */}
        <div className="w-px h-5 bg-[var(--border)] mx-1" />

        {/* Notifications */}
        <button
          id="btn-notifications"
          className="relative text-[var(--text-variant)] hover:bg-[var(--brand-bg)] p-2 rounded-full transition-colors active:scale-95 cursor-pointer"
          title="Notificaciones"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full" />
        </button>

        {/* Settings */}
        <button
          id="btn-settings-header"
          onClick={handleSettingsClick}
          className={`text-[var(--text-variant)] hover:bg-[var(--brand-bg)] p-2 rounded-full transition-colors active:scale-95 cursor-pointer flex items-center justify-center ${
            currentScreen === 'profile'
              ? 'bg-[var(--brand-light)] text-[var(--brand)]'
              : ''
          }`}
          title="Ajustes"
        >
          <span className="hidden">settings</span>
          <Settings size={20} />
        </button>

        {/* Avatar ─ key prop forces img re-mount on URL change */}
        <div
          id="avatar-clickable-wrapper"
          onClick={handleSettingsClick}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--border)] hover:border-[var(--brand)] cursor-pointer active:scale-95 transition-all flex items-center justify-center"
          title="Configuración de Perfil"
        >
          <img
            key={profile.avatarUrl}
            alt="Usuario"
            className="w-full h-full object-cover"
            src={profile.avatarUrl || 'https://ui-avatars.com/api/?name=User&background=005da9&color=fff&size=80'}
            onError={(e) => {
              // Prevent infinite error loop
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                'https://ui-avatars.com/api/?name=User&background=005da9&color=fff&size=80';
            }}
          />
        </div>
      </div>
    </header>
  );
}
