import { motion } from 'framer-motion';
import {
  Wifi,
  LayoutDashboard,
  Monitor,
  Activity,
  Settings,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Signal,
} from 'lucide-react';
import type { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'devices', label: 'Devices', icon: Monitor },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'setup', label: 'Setup Guide', icon: Rocket },
];

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: isOpen ? 256 : 64 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full bg-surface-dark/90 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-surface-dark" />
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden"
          >
            <h1 className="text-lg font-bold text-white whitespace-nowrap">CloudSpot</h1>
            <p className="text-[10px] text-slate-400 whitespace-nowrap">Virtual Hotspot Manager</p>
          </motion.div>
        )}
      </div>

      {/* Status indicator */}
      {isOpen && (
        <div className="mx-3 mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Signal className="w-4 h-4 text-success" />
              <div className="absolute inset-0 w-4 h-4 text-success pulse-ring">
                <Signal className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-success">Hotspot Active</p>
              <p className="text-[10px] text-slate-400">Uptime: 99.9%</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary/20 text-primary-light border border-primary/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-light' : 'group-hover:text-primary-light'}`} />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
              {isActive && isOpen && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-light" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}
