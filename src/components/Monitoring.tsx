import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const cpuData = [
  { time: '00:00', usage: 25 },
  { time: '02:00', usage: 18 },
  { time: '04:00', usage: 12 },
  { time: '06:00', usage: 22 },
  { time: '08:00', usage: 45 },
  { time: '10:00', usage: 62 },
  { time: '12:00', usage: 78 },
  { time: '14:00', usage: 85 },
  { time: '16:00', usage: 72 },
  { time: '18:00', usage: 58 },
  { time: '20:00', usage: 42 },
  { time: '22:00', usage: 30 },
];

const memoryData = [
  { time: '00:00', used: 4.2 },
  { time: '02:00', used: 3.8 },
  { time: '04:00', used: 3.5 },
  { time: '06:00', used: 4.0 },
  { time: '08:00', used: 5.8 },
  { time: '10:00', used: 6.5 },
  { time: '12:00', used: 7.2 },
  { time: '14:00', used: 7.8 },
  { time: '16:00', used: 7.0 },
  { time: '18:00', used: 6.2 },
  { time: '20:00', used: 5.5 },
  { time: '22:00', used: 4.8 },
];

const latencyData = [
  { time: '00:00', latency: 12 },
  { time: '02:00', latency: 8 },
  { time: '04:00', latency: 6 },
  { time: '06:00', latency: 10 },
  { time: '08:00', latency: 18 },
  { time: '10:00', latency: 24 },
  { time: '12:00', latency: 32 },
  { time: '14:00', latency: 38 },
  { time: '16:00', latency: 28 },
  { time: '18:00', latency: 22 },
  { time: '20:00', latency: 16 },
  { time: '22:00', latency: 11 },
];

const bandwidthPie = [
  { name: 'Streaming', value: 42, color: '#6366f1' },
  { name: 'Browsing', value: 23, color: '#06b6d4' },
  { name: 'Downloads', value: 18, color: '#10b981' },
  { name: 'Gaming', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#64748b' },
];

const alerts = [
  { id: 1, type: 'warning', message: 'High CPU usage detected (85%)', time: '14:32', resolved: false },
  { id: 2, type: 'success', message: 'Firmware update completed successfully', time: '12:15', resolved: true },
  { id: 3, type: 'warning', message: 'Memory usage above 75% threshold', time: '10:45', resolved: false },
  { id: 4, type: 'success', message: 'SSL certificate renewed', time: '08:00', resolved: true },
  { id: 5, type: 'info', message: 'New device connected: Chromebook', time: '06:30', resolved: true },
];

const systemMetrics = [
  { label: 'CPU Usage', value: '72%', icon: Cpu, color: 'text-primary-light', bg: 'bg-primary/10', percent: 72 },
  { label: 'Memory', value: '7.8 / 16 GB', icon: MemoryStick, color: 'text-accent', bg: 'bg-accent/10', percent: 49 },
  { label: 'Disk I/O', value: '245 MB/s', icon: HardDrive, color: 'text-success', bg: 'bg-success/10', percent: 35 },
  { label: 'Temperature', value: '62°C', icon: Thermometer, color: 'text-warning', bg: 'bg-warning/10', percent: 62 },
];

export default function Monitoring() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Network Monitoring</h1>
          <p className="text-slate-400 mt-1">Real-time system health and performance metrics</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-300">Last updated: just now</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${metric.bg}`}>
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                </div>
                <span className="text-sm text-slate-400">{metric.label}</span>
              </div>
              <p className="text-xl font-bold text-white mb-2">{metric.value}</p>
              <div className="w-full bg-white/5 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.percent}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    metric.percent > 80 ? 'bg-danger' : metric.percent > 60 ? 'bg-warning' : 'bg-success'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-1">CPU Usage</h3>
          <p className="text-sm text-slate-400 mb-4">24-hour CPU utilization trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cpuData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 10, 46, 0.9)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#6366f1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Memory Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Memory Usage</h3>
          <p className="text-sm text-slate-400 mb-4">24-hour memory consumption (GB)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={memoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit=" GB" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 10, 46, 0.9)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Bar dataKey="used" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Latency Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Network Latency</h3>
          <p className="text-sm text-slate-400 mb-4">Response time in milliseconds</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} unit=" ms" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 10, 46, 0.9)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Line
                type="monotone"
                dataKey="latency"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bandwidth Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Bandwidth Distribution</h3>
          <p className="text-sm text-slate-400 mb-4">Usage by application category</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={bandwidthPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bandwidthPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 10, 46, 0.9)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {bandwidthPie.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-300">{item.name}</span>
                  <span className="text-xs text-slate-500 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary-light" />
          <h3 className="text-lg font-semibold text-white">System Alerts</h3>
        </div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                alert.resolved ? 'bg-white/[0.02]' : 'bg-warning/5 border border-warning/10'
              }`}
            >
              {alert.type === 'warning' && !alert.resolved ? (
                <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              )}
              <span className={`text-sm flex-1 ${alert.resolved ? 'text-slate-400' : 'text-slate-200'}`}>
                {alert.message}
              </span>
              <span className="text-xs text-slate-500">{alert.time}</span>
              {alert.resolved && (
                <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">Resolved</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
