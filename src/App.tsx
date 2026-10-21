import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi, LayoutDashboard, Monitor, Activity, Settings, Rocket,
  ChevronLeft, ChevronRight, ChevronDown, Signal, Users, Download, Upload,
  Shield, Clock, TrendingUp, Globe, Zap, Laptop, Smartphone,
  Tablet, WifiOff, Search, Filter, Ban, Trash2, HardDrive,
  Cpu, MemoryStick, Thermometer, AlertTriangle, CheckCircle,
  Server, Network, Container, Terminal, Check, Copy,
  Save, Eye, EyeOff, Bell, Lock,
} from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

// ==================== TYPES ====================
type Page = 'dashboard' | 'devices' | 'monitoring' | 'settings' | 'setup';

interface Device {
  id: string; name: string; type: 'laptop' | 'phone' | 'tablet' | 'desktop';
  ip: string; mac: string; status: 'connected' | 'disconnected';
  signal: number; download: string; upload: string; lastSeen: string; dataUsed: string;
}

// ==================== DATA ====================
const trafficData = [
  { time: '00:00', download: 120, upload: 45 }, { time: '04:00', download: 80, upload: 30 },
  { time: '08:00', download: 250, upload: 120 }, { time: '12:00', download: 380, upload: 180 },
  { time: '16:00', download: 420, upload: 200 }, { time: '20:00', download: 350, upload: 160 },
  { time: '23:59', download: 200, upload: 90 },
];

const devices: Device[] = [
  { id: '1', name: 'MacBook Pro', type: 'laptop', ip: '192.168.1.10', mac: 'A4:83:E7:2B:1C:9F', status: 'connected', signal: 95, download: '450 Mbps', upload: '120 Mbps', lastSeen: 'Now', dataUsed: '12.4 GB' },
  { id: '2', name: 'iPhone 15 Pro', type: 'phone', ip: '192.168.1.11', mac: 'B5:92:F1:3A:2D:8E', status: 'connected', signal: 88, download: '280 Mbps', upload: '85 Mbps', lastSeen: 'Now', dataUsed: '8.7 GB' },
  { id: '3', name: 'iPad Air', type: 'tablet', ip: '192.168.1.12', mac: 'C6:A1:G2:4B:3E:7D', status: 'connected', signal: 72, download: '190 Mbps', upload: '60 Mbps', lastSeen: 'Now', dataUsed: '5.2 GB' },
  { id: '4', name: 'Windows Desktop', type: 'desktop', ip: '192.168.1.13', mac: 'D7:B0:H3:5C:4F:6E', status: 'connected', signal: 98, download: '890 Mbps', upload: '340 Mbps', lastSeen: 'Now', dataUsed: '45.8 GB' },
  { id: '5', name: 'Galaxy S24', type: 'phone', ip: '192.168.1.14', mac: 'E8:C9:I4:6D:5G:5F', status: 'connected', signal: 65, download: '150 Mbps', upload: '45 Mbps', lastSeen: 'Now', dataUsed: '3.1 GB' },
  { id: '6', name: 'ThinkPad X1', type: 'laptop', ip: '192.168.1.15', mac: 'F9:D8:J5:7E:6H:4G', status: 'disconnected', signal: 0, download: '0 Mbps', upload: '0 Mbps', lastSeen: '2 hrs ago', dataUsed: '18.3 GB' },
  { id: '7', name: 'Pixel Tablet', type: 'tablet', ip: '192.168.1.16', mac: 'G0:E7:K6:8F:7I:3H', status: 'disconnected', signal: 0, download: '0 Mbps', upload: '0 Mbps', lastSeen: '5 hrs ago', dataUsed: '2.8 GB' },
  { id: '8', name: 'Chromebook', type: 'laptop', ip: '192.168.1.17', mac: 'H1:F6:L7:9G:8J:2I', status: 'connected', signal: 82, download: '220 Mbps', upload: '70 Mbps', lastSeen: 'Now', dataUsed: '6.5 GB' },
];

const cpuData = [
  { time: '00:00', usage: 25 }, { time: '02:00', usage: 18 }, { time: '04:00', usage: 12 },
  { time: '06:00', usage: 22 }, { time: '08:00', usage: 45 }, { time: '10:00', usage: 62 },
  { time: '12:00', usage: 78 }, { time: '14:00', usage: 85 }, { time: '16:00', usage: 72 },
  { time: '18:00', usage: 58 }, { time: '20:00', usage: 42 }, { time: '22:00', usage: 30 },
];

const memoryData = [
  { time: '00:00', used: 4.2 }, { time: '02:00', used: 3.8 }, { time: '04:00', used: 3.5 },
  { time: '06:00', used: 4.0 }, { time: '08:00', used: 5.8 }, { time: '10:00', used: 6.5 },
  { time: '12:00', used: 7.2 }, { time: '14:00', used: 7.8 }, { time: '16:00', used: 7.0 },
  { time: '18:00', used: 6.2 }, { time: '20:00', used: 5.5 }, { time: '22:00', used: 4.8 },
];

const latencyData = [
  { time: '00:00', latency: 12 }, { time: '02:00', latency: 8 }, { time: '04:00', latency: 6 },
  { time: '06:00', latency: 10 }, { time: '08:00', latency: 18 }, { time: '10:00', latency: 24 },
  { time: '12:00', latency: 32 }, { time: '14:00', latency: 38 }, { time: '16:00', latency: 28 },
  { time: '18:00', latency: 22 }, { time: '20:00', latency: 16 }, { time: '22:00', latency: 11 },
];

const bandwidthPie = [
  { name: 'Streaming', value: 42, color: '#6366f1' }, { name: 'Browsing', value: 23, color: '#06b6d4' },
  { name: 'Downloads', value: 18, color: '#10b981' }, { name: 'Gaming', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#64748b' },
];

const alerts = [
  { id: 1, type: 'warning', message: 'High CPU usage detected (85%)', time: '14:32', resolved: false },
  { id: 2, type: 'success', message: 'Firmware update completed successfully', time: '12:15', resolved: true },
  { id: 3, type: 'warning', message: 'Memory usage above 75% threshold', time: '10:45', resolved: false },
  { id: 4, type: 'success', message: 'SSL certificate renewed', time: '08:00', resolved: true },
  { id: 5, type: 'info', message: 'New device connected: Chromebook', time: '06:30', resolved: true },
];

const setupSteps = [
  { id: 1, title: 'Set up a Virtual Machine', description: 'Use Compute Engine to provision a VM instance.', icon: Server, color: 'from-blue-500 to-blue-600', details: ['Select machine type (e2-medium for basic)', 'Choose Ubuntu 22.04 LTS', 'Configure boot disk (30GB min)', 'Enable HTTP/HTTPS firewall rules', 'Set up service account'], command: 'gcloud compute instances create hotspot-server \\\n  --zone=us-central1-a \\\n  --machine-type=e2-medium \\\n  --image-family=ubuntu-2204-lts \\\n  --image-project=ubuntu-os-cloud \\\n  --boot-disk-size=30GB' },
  { id: 2, title: 'Configure Storage', description: 'Attach Persistent Disk for data storage.', icon: HardDrive, color: 'from-emerald-500 to-emerald-600', details: ['Create persistent disk', 'Format and mount to VM', 'Set up automatic snapshots', 'Configure performance tier'], command: 'gcloud compute disks create hotspot-data \\\n  --size=100GB \\\n  --type=pd-ssd \\\n  --zone=us-central1-a' },
  { id: 3, title: 'Establish Network', description: 'Create VPC network with subnets and firewall rules.', icon: Network, color: 'from-purple-500 to-purple-600', details: ['Create custom VPC network', 'Define subnet IP ranges', 'Configure firewall rules', 'Set up NAT gateway'], command: 'gcloud compute networks create hotspot-vpc \\\n  --subnet-mode=custom\n\ngcloud compute networks subnets create hotspot-subnet \\\n  --network=hotspot-vpc \\\n  --region=us-central1 \\\n  --range=10.0.1.0/24' },
  { id: 4, title: 'Manage DNS', description: 'Configure Cloud DNS for custom domain.', icon: Globe, color: 'from-amber-500 to-amber-600', details: ['Create managed DNS zone', 'Add A records to VM IP', 'Configure DNSSEC', 'Set up reverse DNS'], command: 'gcloud dns managed-zones create hotspot-zone \\\n  --dns-name="hotspot.example.com" \\\n  --description="Hotspot DNS zone"' },
  { id: 5, title: 'Deploy Application', description: 'Install hotspot software on the VM.', icon: Container, color: 'from-cyan-500 to-cyan-600', details: ['Push images to Artifact Registry', 'Install CoovaChilli/OpenNDS', 'Configure captive portal', 'Set up RADIUS integration'], command: 'gcloud artifacts repositories create hotspot-images \\\n  --repository-format=docker \\\n  --location=us-central1' },
  { id: 6, title: 'Secure Access', description: 'Use IAP to secure administrative access.', icon: Shield, color: 'from-red-500 to-red-600', details: ['Enable IAP for VM', 'Configure IAM policies', 'Set up OS Login', 'Enable 2FA'], command: 'gcloud compute firewall-rules create allow-iap \\\n  --direction=INGRESS \\\n  --action=allow \\\n  --rules=tcp:22 \\\n  --source-ranges=35.235.240.0/20' },
  { id: 7, title: 'Monitor & Log', description: 'Implement Cloud Monitoring and Logging.', icon: Activity, color: 'from-indigo-500 to-indigo-600', details: ['Set up monitoring dashboards', 'Configure alerting policies', 'Enable Cloud Logging', 'Create log exports'], command: 'gcloud logging sinks create hotspot-logs \\\n  bigquery.googleapis.com/projects/project/datasets/hotspot_logs \\\n  --log-filter=\'resource.type="gce_instance"\'' },
  { id: 8, title: 'Manage Identities', description: 'Use Cloud Identity for access management.', icon: Users, color: 'from-pink-500 to-pink-600', details: ['Create user groups', 'Assign IAM roles', 'Set up conditional access', 'Configure key management'], command: 'gcloud iam service-accounts create hotspot-sa \\\n  --display-name="Hotspot Service Account"' },
  { id: 9, title: 'Automate with SDK', description: 'Use Cloud SDK for programmatic management.', icon: Terminal, color: 'from-teal-500 to-teal-600', details: ['Install gcloud CLI', 'Create deployment scripts', 'Set up CI/CD pipelines', 'Automate scaling policies'], command: 'curl https://sdk.cloud.google.com | bash\ngcloud init\ngcloud auth login\n./deploy-hotspot.sh --env=production' },
];

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'devices', label: 'Devices', icon: Monitor },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'setup', label: 'Setup', icon: Rocket },
];

// ==================== TOGGLE COMPONENT ====================
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{ backgroundColor: enabled ? '#6366f1' : 'rgba(255,255,255,0.1)' }}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

// ==================== SIDEBAR ====================
function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }: {
  currentPage: Page; setCurrentPage: (p: Page) => void; isOpen: boolean; setIsOpen: (o: boolean) => void;
}) {
  return (
    <motion.aside animate={{ width: isOpen ? 256 : 64 }} transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full bg-surface-dark/90 backdrop-blur-xl border-r border-white/5 z-50 flex flex-col">
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-surface-dark" />
        </div>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-lg font-bold text-white whitespace-nowrap">CloudSpot</h1>
            <p className="text-[10px] text-slate-400 whitespace-nowrap">Virtual Hotspot Manager</p>
          </motion.div>
        )}
      </div>
      {isOpen && (
        <div className="mx-3 mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-2">
            <Signal className="w-4 h-4 text-success" />
            <div>
              <p className="text-xs font-medium text-success">Hotspot Active</p>
              <p className="text-[10px] text-slate-400">Uptime: 99.9%</p>
            </div>
          </div>
        </div>
      )}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button key={item.id} onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive ? 'bg-primary/20 text-primary-light border border-primary/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}>
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-light' : ''}`} />
              {isOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              {isActive && isOpen && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-light" />}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/5">
        <button onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}

// ==================== DASHBOARD PAGE ====================
function DashboardPage() {
  const stats = [
    { label: 'Connected Devices', value: '24', change: '+3', icon: Users, color: 'from-primary to-primary-light', bgColor: 'bg-primary/10', borderColor: 'border-primary/20' },
    { label: 'Bandwidth Used', value: '847 GB', change: '+12%', icon: Activity, color: 'from-accent to-cyan-300', bgColor: 'bg-accent/10', borderColor: 'border-accent/20' },
    { label: 'Download Speed', value: '1.2 Gbps', change: '+5%', icon: Download, color: 'from-success to-emerald-300', bgColor: 'bg-success/10', borderColor: 'border-success/20' },
    { label: 'Upload Speed', value: '450 Mbps', change: '+8%', icon: Upload, color: 'from-warning to-amber-300', bgColor: 'bg-warning/10', borderColor: 'border-warning/20' },
  ];
  const recentActivity = [
    { device: 'MacBook Pro', action: 'Connected', time: '2 min ago', type: 'connect' },
    { device: 'iPhone 15', action: 'Data limit warning', time: '15 min ago', type: 'warning' },
    { device: 'Galaxy S24', action: 'Disconnected', time: '32 min ago', type: 'disconnect' },
    { device: 'Windows PC', action: 'Firmware updated', time: '1 hr ago', type: 'update' },
    { device: 'iPad Air', action: 'Connected', time: '2 hrs ago', type: 'connect' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Monitor your virtual hotspot performance</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/10 border border-success/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-success font-medium">All Systems Operational</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-xl bg-white/5 backdrop-blur-sm border ${stat.borderColor} hover:bg-white/[0.07] transition-all`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}><Icon className="w-5 h-5 text-white" /></div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div><h3 className="text-lg font-semibold text-white">Network Traffic</h3><p className="text-sm text-slate-400">Today's bandwidth usage</p></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-xs text-slate-400">Download</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-accent" /><span className="text-xs text-slate-400">Upload</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} /><stop offset="95%" stopColor="#06b6d4" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15,10,46,0.9)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="download" stroke="#6366f1" fill="url(#dg)" strokeWidth={2} />
              <Area type="monotone" dataKey="upload" stroke="#06b6d4" fill="url(#ug)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${a.type === 'connect' ? 'bg-success/20 text-success' : a.type === 'warning' ? 'bg-warning/20 text-warning' : a.type === 'disconnect' ? 'bg-danger/20 text-danger' : 'bg-primary/20 text-primary-light'}`}>
                  {a.type === 'connect' && <Wifi className="w-3.5 h-3.5" />}
                  {a.type === 'warning' && <Shield className="w-3.5 h-3.5" />}
                  {a.type === 'disconnect' && <WifiOff className="w-3.5 h-3.5" />}
                  {a.type === 'update' && <Zap className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{a.device}</p><p className="text-xs text-slate-400">{a.action}</p></div>
                <span className="text-xs text-slate-500 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-3"><Globe className="w-8 h-8 text-primary-light" /><div><p className="text-sm font-medium text-white">Public IP</p><p className="text-xs text-slate-400">35.192.0.147</p></div></div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
          <div className="flex items-center gap-3"><Clock className="w-8 h-8 text-accent" /><div><p className="text-sm font-medium text-white">Uptime</p><p className="text-xs text-slate-400">47 days, 12 hours</p></div></div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20">
          <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-success" /><div><p className="text-sm font-medium text-white">Security</p><p className="text-xs text-slate-400">WPA3 Enabled</p></div></div>
        </div>
      </div>
    </div>
  );
}

// ==================== DEVICES PAGE ====================
function DevicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'connected' | 'disconnected'>('all');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const getIcon = (t: Device['type']) => t === 'laptop' ? Laptop : t === 'phone' ? Smartphone : t === 'tablet' ? Tablet : Monitor;
  const filtered = devices.filter(d => {
    const ms = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.ip.includes(searchQuery) || d.mac.toLowerCase().includes(searchQuery.toLowerCase());
    const mf = filterStatus === 'all' || d.status === filterStatus;
    return ms && mf;
  });
  const connectedCount = devices.filter(d => d.status === 'connected').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-white">Connected Devices</h1><p className="text-slate-400 mt-1">{connectedCount} devices currently connected</p></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search devices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {(['all', 'connected', 'disconnected'] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === s ? 'bg-primary/20 text-primary-light border border-primary/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map((device, index) => {
            const Icon = getIcon(device.type);
            const isSelected = selectedDevice === device.id;
            return (
              <motion.div key={device.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }} onClick={() => setSelectedDevice(isSelected ? null : device.id)}
                className={`p-4 rounded-xl bg-white/5 backdrop-blur-sm border cursor-pointer transition-all ${isSelected ? 'border-primary/50 bg-primary/10' : 'border-white/10 hover:border-white/20'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${device.status === 'connected' ? 'bg-success/10' : 'bg-slate-500/10'}`}>
                      <Icon className={`w-5 h-5 ${device.status === 'connected' ? 'text-success' : 'text-slate-400'}`} />
                    </div>
                    <div><h3 className="text-sm font-semibold text-white">{device.name}</h3><p className="text-xs text-slate-400">{device.ip}</p></div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${device.status === 'connected' ? 'bg-success/10 text-success' : 'bg-slate-500/10 text-slate-400'}`}>
                    {device.status === 'connected' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                    {device.status === 'connected' ? 'Active' : 'Offline'}
                  </div>
                </div>
                {isSelected && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2"><Signal className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs text-slate-300">Signal: {device.signal}%</span></div>
                      <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs text-slate-300">Last: {device.lastSeen}</span></div>
                      <div className="flex items-center gap-2"><HardDrive className="w-3.5 h-3.5 text-slate-400" /><span className="text-xs text-slate-300">Data: {device.dataUsed}</span></div>
                      <span className="text-xs text-slate-400">MAC: {device.mac}</span>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full h-1.5"><div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${device.signal}%` }} /></div>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-xs font-medium hover:bg-warning/20"><Ban className="w-3 h-3" /> Block</button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 text-danger text-xs font-medium hover:bg-danger/20"><Trash2 className="w-3 h-3" /> Remove</button>
                    </div>
                  </motion.div>
                )}
                {device.status === 'connected' && (
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-400"><span>↓ {device.download}</span><span>↑ {device.upload}</span></div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      {filtered.length === 0 && <div className="text-center py-12"><WifiOff className="w-12 h-12 text-slate-500 mx-auto mb-3" /><p className="text-slate-400">No devices found</p></div>}
    </div>
  );
}

// ==================== MONITORING PAGE ====================
function MonitoringPage() {
  const metrics = [
    { label: 'CPU Usage', value: '72%', icon: Cpu, color: 'text-primary-light', bg: 'bg-primary/10', percent: 72 },
    { label: 'Memory', value: '7.8 / 16 GB', icon: MemoryStick, color: 'text-accent', bg: 'bg-accent/10', percent: 49 },
    { label: 'Disk I/O', value: '245 MB/s', icon: HardDrive, color: 'text-success', bg: 'bg-success/10', percent: 35 },
    { label: 'Temperature', value: '62°C', icon: Thermometer, color: 'text-warning', bg: 'bg-warning/10', percent: 62 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-white">Network Monitoring</h1><p className="text-slate-400 mt-1">Real-time system health and performance</p></div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"><Clock className="w-4 h-4 text-slate-400" /><span className="text-sm text-slate-300">Updated: just now</span></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-3 mb-3"><div className={`p-2 rounded-lg ${m.bg}`}><Icon className={`w-4 h-4 ${m.color}`} /></div><span className="text-sm text-slate-400">{m.label}</span></div>
              <p className="text-xl font-bold text-white mb-2">{m.value}</p>
              <div className="w-full bg-white/5 rounded-full h-2">
                <motion.div initial={{ width: 0 }} animate={{ width: `${m.percent}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                  className={`h-full rounded-full ${m.percent > 80 ? 'bg-danger' : m.percent > 60 ? 'bg-warning' : 'bg-success'}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-1">CPU Usage</h3><p className="text-sm text-slate-400 mb-4">24-hour trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cpuData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="time" stroke="#64748b" fontSize={11} /><YAxis stroke="#64748b" fontSize={11} unit="%" /><Tooltip contentStyle={{ backgroundColor: 'rgba(15,10,46,0.9)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: '#e2e8f0' }} /><Line type="monotone" dataKey="usage" stroke="#6366f1" strokeWidth={2} dot={false} /></LineChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-1">Memory Usage</h3><p className="text-sm text-slate-400 mb-4">24-hour consumption (GB)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={memoryData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="time" stroke="#64748b" fontSize={11} /><YAxis stroke="#64748b" fontSize={11} unit=" GB" /><Tooltip contentStyle={{ backgroundColor: 'rgba(15,10,46,0.9)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '8px', color: '#e2e8f0' }} /><Bar dataKey="used" fill="#06b6d4" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-1">Network Latency</h3><p className="text-sm text-slate-400 mb-4">Response time (ms)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={latencyData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="time" stroke="#64748b" fontSize={11} /><YAxis stroke="#64748b" fontSize={11} unit=" ms" /><Tooltip contentStyle={{ backgroundColor: 'rgba(15,10,46,0.9)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', color: '#e2e8f0' }} /><Line type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={2} dot={false} /></LineChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-1">Bandwidth Distribution</h3><p className="text-sm text-slate-400 mb-4">By application category</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart><Pie data={bandwidthPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">{bandwidthPie.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={{ backgroundColor: 'rgba(15,10,46,0.9)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', color: '#e2e8f0' }} /></PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">{bandwidthPie.map((item) => (<div key={item.name} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-xs text-slate-300">{item.name}</span><span className="text-xs text-slate-500 ml-auto">{item.value}%</span></div>))}</div>
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-2 mb-4"><Activity className="w-5 h-5 text-primary-light" /><h3 className="text-lg font-semibold text-white">System Alerts</h3></div>
        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a.id} className={`flex items-center gap-3 p-3 rounded-lg ${a.resolved ? 'bg-white/[0.02]' : 'bg-warning/5 border border-warning/10'}`}>
              {a.type === 'warning' && !a.resolved ? <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" /> : <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />}
              <span className={`text-sm flex-1 ${a.resolved ? 'text-slate-400' : 'text-slate-200'}`}>{a.message}</span>
              <span className="text-xs text-slate-500">{a.time}</span>
              {a.resolved && <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">Resolved</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ==================== SETTINGS PAGE ====================
function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [s, setS] = useState({
    networkName: 'CloudSpot-5G', password: 'SecureHotspot2024!', securityType: 'WPA3', band: 'dual', channel: 'auto',
    maxDevices: 50, bandwidthLimit: '100', guestNetwork: true, guestNetworkName: 'CloudSpot-Guest', guestPassword: 'Guest2024!',
    hiddenSSID: false, wpsEnabled: false, macFiltering: true, autoUpdate: true, notifications: true, logging: true,
    dnsServer: '8.8.8.8', dhcpStart: '192.168.1.100', dhcpEnd: '192.168.1.200', leaseTime: '24',
  });
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const up = (k: string, v: string | number | boolean) => setS((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-white">Settings</h1><p className="text-slate-400 mt-1">Configure your virtual hotspot</p></div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${saved ? 'bg-success/20 text-success border border-success/30' : 'bg-primary text-white hover:bg-primary-dark'}`}>
          {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-primary/10"><Wifi className="w-5 h-5 text-primary-light" /></div><div><h3 className="text-lg font-semibold text-white">Network</h3><p className="text-xs text-slate-400">Basic configuration</p></div></div>
          <div className="space-y-4">
            <div><label className="text-sm text-slate-300 mb-1.5 block">Network Name (SSID)</label><input type="text" value={s.networkName} onChange={(e) => up('networkName', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
            <div><label className="text-sm text-slate-300 mb-1.5 block">Password</label><div className="relative"><input type={showPassword ? 'text' : 'password'} value={s.password} onChange={(e) => up('password', e.target.value)} className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /><button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-sm text-slate-300 mb-1.5 block">Security</label><select value={s.securityType} onChange={(e) => up('securityType', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"><option value="WPA3">WPA3</option><option value="WPA2/WPA3">WPA2/WPA3</option><option value="WPA2">WPA2</option></select></div>
              <div><label className="text-sm text-slate-300 mb-1.5 block">Band</label><select value={s.band} onChange={(e) => up('band', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"><option value="dual">Dual Band</option><option value="2.4">2.4 GHz</option><option value="5">5 GHz</option><option value="6">6 GHz</option></select></div>
            </div>
            <div><label className="text-sm text-slate-300 mb-1.5 block">Channel</label><select value={s.channel} onChange={(e) => up('channel', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"><option value="auto">Auto</option><option value="1">Channel 1</option><option value="6">Channel 6</option><option value="11">Channel 11</option></select></div>
            <div className="flex items-center justify-between py-2"><div><p className="text-sm text-slate-300">Hidden SSID</p><p className="text-xs text-slate-500">Don't broadcast name</p></div><Toggle enabled={s.hiddenSSID} onChange={() => up('hiddenSSID', !s.hiddenSSID)} /></div>
          </div>
        </motion.div>
        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-success/10"><Shield className="w-5 h-5 text-success" /></div><div><h3 className="text-lg font-semibold text-white">Security</h3><p className="text-xs text-slate-400">Access control</p></div></div>
          <div className="space-y-4">
            <div><label className="text-sm text-slate-300 mb-1.5 block">Max Devices</label><input type="number" value={s.maxDevices} onChange={(e) => up('maxDevices', parseInt(e.target.value))} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
            <div><label className="text-sm text-slate-300 mb-1.5 block">Bandwidth Limit (Mbps)</label><input type="number" value={s.bandwidthLimit} onChange={(e) => up('bandwidthLimit', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
            <div className="flex items-center justify-between py-2"><div><p className="text-sm text-slate-300">MAC Filtering</p><p className="text-xs text-slate-500">Only registered devices</p></div><Toggle enabled={s.macFiltering} onChange={() => up('macFiltering', !s.macFiltering)} /></div>
            <div className="flex items-center justify-between py-2"><div><p className="text-sm text-slate-300">WPS</p><p className="text-xs text-slate-500">Wi-Fi Protected Setup</p></div><Toggle enabled={s.wpsEnabled} onChange={() => up('wpsEnabled', !s.wpsEnabled)} /></div>
            <div className="flex items-center justify-between py-2"><div><p className="text-sm text-slate-300">Auto Updates</p><p className="text-xs text-slate-500">Patch vulnerabilities</p></div><Toggle enabled={s.autoUpdate} onChange={() => up('autoUpdate', !s.autoUpdate)} /></div>
          </div>
        </motion.div>
        {/* Guest */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-accent/10"><Users className="w-5 h-5 text-accent" /></div><div><h3 className="text-lg font-semibold text-white">Guest Network</h3><p className="text-xs text-slate-400">Visitor access</p></div></div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2"><div><p className="text-sm text-slate-300">Enable Guest Network</p><p className="text-xs text-slate-500">Isolated guest access</p></div><Toggle enabled={s.guestNetwork} onChange={() => up('guestNetwork', !s.guestNetwork)} /></div>
            {s.guestNetwork && (<>
              <div><label className="text-sm text-slate-300 mb-1.5 block">Guest Network Name</label><input type="text" value={s.guestNetworkName} onChange={(e) => up('guestNetworkName', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
              <div><label className="text-sm text-slate-300 mb-1.5 block">Guest Password</label><input type="text" value={s.guestPassword} onChange={(e) => up('guestPassword', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
            </>)}
          </div>
        </motion.div>
        {/* Advanced */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3 mb-6"><div className="p-2 rounded-lg bg-warning/10"><Globe className="w-5 h-5 text-warning" /></div><div><h3 className="text-lg font-semibold text-white">Advanced</h3><p className="text-xs text-slate-400">DNS, DHCP, system</p></div></div>
          <div className="space-y-4">
            <div><label className="text-sm text-slate-300 mb-1.5 block">DNS Server</label><input type="text" value={s.dnsServer} onChange={(e) => up('dnsServer', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-sm text-slate-300 mb-1.5 block">DHCP Start</label><input type="text" value={s.dhcpStart} onChange={(e) => up('dhcpStart', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
              <div><label className="text-sm text-slate-300 mb-1.5 block">DHCP End</label><input type="text" value={s.dhcpEnd} onChange={(e) => up('dhcpEnd', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
            </div>
            <div><label className="text-sm text-slate-300 mb-1.5 block">Lease Time (hours)</label><input type="number" value={s.leaseTime} onChange={(e) => up('leaseTime', e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50" /></div>
            <div className="flex items-center justify-between py-2"><div><p className="text-sm text-slate-300">System Logging</p><p className="text-xs text-slate-500">Collect system logs</p></div><Toggle enabled={s.logging} onChange={() => up('logging', !s.logging)} /></div>
            <div className="flex items-center justify-between py-2"><div><p className="text-sm text-slate-300">Notifications</p><p className="text-xs text-slate-500">Critical event alerts</p></div><Toggle enabled={s.notifications} onChange={() => up('notifications', !s.notifications)} /></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ==================== SETUP PAGE ====================
function SetupPage() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const progress = (completed.length / setupSteps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl lg:text-3xl font-bold text-white">Setup Guide</h1><p className="text-slate-400 mt-1">Deploy your virtual hotspot on Google Cloud</p></div>
        <div className="flex items-center gap-3">
          <div className="text-right"><p className="text-sm font-medium text-white">{completed.length}/{setupSteps.length} completed</p><p className="text-xs text-slate-400">{Math.round(progress)}%</p></div>
          <div className="w-12 h-12 rounded-full border-3 border-white/10 relative">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray={`${progress * 0.942} 94.2`} strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full bg-white/5 rounded-full h-2"><motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} /></div>
      <div className="space-y-3">
        {setupSteps.map((step, index) => {
          const Icon = step.icon;
          const isExp = expanded === step.id;
          const isDone = completed.includes(step.id);
          return (
            <motion.div key={step.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              className={`rounded-xl border transition-all ${isExp ? 'bg-white/[0.07] border-primary/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
              <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpanded(isExp ? null : step.id)}>
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center ${isDone ? 'opacity-50' : ''}`}><Icon className="w-5 h-5 text-white" /></div>
                  {isDone && <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center"><CheckCircle className="w-3 h-3 text-white" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="text-xs text-slate-500 font-mono">Step {step.id}</span>{isDone && <span className="text-xs text-success bg-success/10 px-1.5 py-0.5 rounded">Complete</span>}</div>
                  <h3 className="text-sm font-semibold text-white mt-0.5">{step.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{step.description}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setCompleted(p => p.includes(step.id) ? p.filter(x => x !== step.id) : [...p, step.id]); }}
                  className={`p-2 rounded-lg transition-colors ${isDone ? 'bg-success/10 text-success' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                  {isDone ? <CheckCircle className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
                </button>
                {isExp ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
              </div>
              {isExp && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-4 pb-4">
                  <div className="ml-14 space-y-4">
                    <div className="space-y-2">{step.details.map((d, i) => (<div key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-light mt-1.5 flex-shrink-0" /><p className="text-sm text-slate-300">{d}</p></div>))}</div>
                    {step.command && (
                      <div className="relative">
                        <div className="flex items-center justify-between px-3 py-2 bg-surface-dark rounded-t-lg border border-white/10 border-b-0">
                          <span className="text-xs text-slate-400 font-mono">Terminal</span>
                          <button onClick={() => { navigator.clipboard.writeText(step.command!); setCopied(step.id); setTimeout(() => setCopied(null), 2000); }}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white">{copied === step.id ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}</button>
                        </div>
                        <pre className="p-3 bg-surface-dark/80 rounded-b-lg border border-white/10 border-t-0 overflow-x-auto"><code className="text-xs text-green-400 font-mono whitespace-pre">{step.command}</code></pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'devices': return <DevicesPage />;
      case 'monitoring': return <MonitoringPage />;
      case 'settings': return <SettingsPage />;
      case 'setup': return <SetupPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-6 lg:p-8">
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
