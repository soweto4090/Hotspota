import { motion } from 'framer-motion';
import {
  Wifi,
  Users,
  Activity,
  Download,
  Upload,
  Shield,
  Clock,
  TrendingUp,
  Globe,
  Zap,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trafficData = [
  { time: '00:00', download: 120, upload: 45 },
  { time: '04:00', download: 80, upload: 30 },
  { time: '08:00', download: 250, upload: 120 },
  { time: '12:00', download: 380, upload: 180 },
  { time: '16:00', download: 420, upload: 200 },
  { time: '20:00', download: 350, upload: 160 },
  { time: '23:59', download: 200, upload: 90 },
];

const stats = [
  {
    label: 'Connected Devices',
    value: '24',
    change: '+3',
    icon: Users,
    color: 'from-primary to-primary-light',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
  },
  {
    label: 'Bandwidth Used',
    value: '847 GB',
    change: '+12%',
    icon: Activity,
    color: 'from-accent to-cyan-300',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
  },
  {
    label: 'Download Speed',
    value: '1.2 Gbps',
    change: '+5%',
    icon: Download,
    color: 'from-success to-emerald-300',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
  },
  {
    label: 'Upload Speed',
    value: '450 Mbps',
    change: '+8%',
    icon: Upload,
    color: 'from-warning to-amber-300',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20',
  },
];

const recentActivity = [
  { device: 'MacBook Pro', action: 'Connected', time: '2 min ago', type: 'connect' },
  { device: 'iPhone 15', action: 'Data limit warning', time: '15 min ago', type: 'warning' },
  { device: 'Galaxy S24', action: 'Disconnected', time: '32 min ago', type: 'disconnect' },
  { device: 'Windows PC', action: 'Firmware updated', time: '1 hr ago', type: 'update' },
  { device: 'iPad Air', action: 'Connected', time: '2 hrs ago', type: 'connect' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Monitor your virtual hotspot performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/20">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-success font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className={`p-5 rounded-xl bg-white/5 backdrop-blur-sm border ${stat.borderColor} hover:bg-white/[0.07] transition-all duration-300`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">{stat.change}</span>
                    <span className="text-xs text-slate-500">vs last week</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Network Traffic</h3>
              <p className="text-sm text-slate-400">Today's bandwidth usage</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-slate-400">Download</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-slate-400">Upload</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="downloadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 10, 46, 0.9)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Area
                type="monotone"
                dataKey="download"
                stroke="#6366f1"
                fill="url(#downloadGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="upload"
                stroke="#06b6d4"
                fill="url(#uploadGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'connect'
                      ? 'bg-success/20 text-success'
                      : activity.type === 'warning'
                      ? 'bg-warning/20 text-warning'
                      : activity.type === 'disconnect'
                      ? 'bg-danger/20 text-danger'
                      : 'bg-primary/20 text-primary-light'
                  }`}
                >
                  {activity.type === 'connect' && <Wifi className="w-3.5 h-3.5" />}
                  {activity.type === 'warning' && <Shield className="w-3.5 h-3.5" />}
                  {activity.type === 'disconnect' && <Wifi className="w-3.5 h-3.5" />}
                  {activity.type === 'update' && <Zap className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{activity.device}</p>
                  <p className="text-xs text-slate-400">{activity.action}</p>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-primary-light" />
            <div>
              <p className="text-sm font-medium text-white">Public IP</p>
              <p className="text-xs text-slate-400">35.192.0.147</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm font-medium text-white">Uptime</p>
              <p className="text-xs text-slate-400">47 days, 12 hours</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-success" />
            <div>
              <p className="text-sm font-medium text-white">Security</p>
              <p className="text-xs text-slate-400">WPA3 Enabled</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
