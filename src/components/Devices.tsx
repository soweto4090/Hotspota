import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Wifi,
  WifiOff,
  MoreVertical,
  Ban,
  Trash2,
  Search,
  Filter,
  Signal,
  Clock,
  HardDrive,
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'laptop' | 'phone' | 'tablet' | 'desktop';
  ip: string;
  mac: string;
  status: 'connected' | 'disconnected';
  signal: number;
  download: string;
  upload: string;
  lastSeen: string;
  dataUsed: string;
}

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

const getDeviceIcon = (type: Device['type']) => {
  switch (type) {
    case 'laptop': return Laptop;
    case 'phone': return Smartphone;
    case 'tablet': return Tablet;
    case 'desktop': return Monitor;
  }
};

export default function Devices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'connected' | 'disconnected'>('all');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.ip.includes(searchQuery) ||
      device.mac.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const connectedCount = devices.filter(d => d.status === 'connected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Connected Devices</h1>
          <p className="text-slate-400 mt-1">{connectedCount} devices currently connected</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, IP, or MAC address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {(['all', 'connected', 'disconnected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-primary/20 text-primary-light border border-primary/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredDevices.map((device, index) => {
            const Icon = getDeviceIcon(device.type);
            const isSelected = selectedDevice === device.id;
            return (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedDevice(isSelected ? null : device.id)}
                className={`p-4 rounded-xl bg-white/5 backdrop-blur-sm border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary/50 bg-primary/10 ring-1 ring-primary/30'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${
                      device.status === 'connected' ? 'bg-success/10' : 'bg-slate-500/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        device.status === 'connected' ? 'text-success' : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{device.name}</h3>
                      <p className="text-xs text-slate-400">{device.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      device.status === 'connected'
                        ? 'bg-success/10 text-success'
                        : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {device.status === 'connected' ? (
                        <Wifi className="w-3 h-3" />
                      ) : (
                        <WifiOff className="w-3 h-3" />
                      )}
                      {device.status === 'connected' ? 'Active' : 'Offline'}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-white/10 space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Signal className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-300">Signal: {device.signal}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-300">Last seen: {device.lastSeen}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-300">Data: {device.dataUsed}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400">MAC: {device.mac}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/5 rounded-full h-1.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${device.signal}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 text-warning text-xs font-medium hover:bg-warning/20 transition-colors">
                        <Ban className="w-3 h-3" /> Block
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 text-danger text-xs font-medium hover:bg-danger/20 transition-colors">
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </motion.div>
                )}

                {device.status === 'connected' && (
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                    <span>↓ {device.download}</span>
                    <span>↑ {device.upload}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <WifiOff className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400">No devices found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
