import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wifi,
  Shield,
  Globe,
  Bell,
  Users,
  Lock,
  Save,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{ backgroundColor: enabled ? '#6366f1' : 'rgba(255,255,255,0.1)' }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    networkName: 'CloudSpot-5G',
    password: 'SecureHotspot2024!',
    securityType: 'WPA3',
    band: 'dual',
    channel: 'auto',
    maxDevices: 50,
    bandwidthLimit: '100',
    guestNetwork: true,
    guestNetworkName: 'CloudSpot-Guest',
    guestPassword: 'Guest2024!',
    hiddenSSID: false,
    wpsEnabled: false,
    macFiltering: true,
    autoUpdate: true,
    notifications: true,
    logging: true,
    dnsServer: '8.8.8.8',
    dhcpStart: '192.168.1.100',
    dhcpEnd: '192.168.1.200',
    leaseTime: '24',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSetting = (key: string, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Configure your virtual hotspot</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
            saved
              ? 'bg-success/20 text-success border border-success/30'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {saved ? (
            <>
              <Shield className="w-4 h-4" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wifi className="w-5 h-5 text-primary-light" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Network</h3>
              <p className="text-xs text-slate-400">Basic network configuration</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 mb-1.5 block">Network Name (SSID)</label>
              <input
                type="text"
                value={settings.networkName}
                onChange={(e) => updateSetting('networkName', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={settings.password}
                  onChange={(e) => updateSetting('password', e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">Security</label>
                <select
                  value={settings.securityType}
                  onChange={(e) => updateSetting('securityType', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                >
                  <option value="WPA3">WPA3</option>
                  <option value="WPA2/WPA3">WPA2/WPA3</option>
                  <option value="WPA2">WPA2</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">Band</label>
                <select
                  value={settings.band}
                  onChange={(e) => updateSetting('band', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                >
                  <option value="dual">Dual Band</option>
                  <option value="2.4">2.4 GHz</option>
                  <option value="5">5 GHz</option>
                  <option value="6">6 GHz</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1.5 block">Channel</label>
              <select
                value={settings.channel}
                onChange={(e) => updateSetting('channel', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
              >
                <option value="auto">Auto</option>
                <option value="1">Channel 1</option>
                <option value="6">Channel 6</option>
                <option value="11">Channel 11</option>
                <option value="36">Channel 36</option>
                <option value="44">Channel 44</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-slate-300">Hidden SSID</p>
                <p className="text-xs text-slate-500">Don't broadcast network name</p>
              </div>
              <Toggle
                enabled={settings.hiddenSSID}
                onChange={() => updateSetting('hiddenSSID', !settings.hiddenSSID)}
              />
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-success/10">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Security</h3>
              <p className="text-xs text-slate-400">Access control and filtering</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 mb-1.5 block">Max Connected Devices</label>
              <input
                type="number"
                value={settings.maxDevices}
                onChange={(e) => updateSetting('maxDevices', parseInt(e.target.value))}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1.5 block">Bandwidth Limit per Device (Mbps)</label>
              <input
                type="number"
                value={settings.bandwidthLimit}
                onChange={(e) => updateSetting('bandwidthLimit', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-slate-300">MAC Address Filtering</p>
                <p className="text-xs text-slate-500">Only allow registered devices</p>
              </div>
              <Toggle
                enabled={settings.macFiltering}
                onChange={() => updateSetting('macFiltering', !settings.macFiltering)}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-slate-300">WPS</p>
                <p className="text-xs text-slate-500">Wi-Fi Protected Setup</p>
              </div>
              <Toggle
                enabled={settings.wpsEnabled}
                onChange={() => updateSetting('wpsEnabled', !settings.wpsEnabled)}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-slate-300">Auto Security Updates</p>
                <p className="text-xs text-slate-500">Automatically patch vulnerabilities</p>
              </div>
              <Toggle
                enabled={settings.autoUpdate}
                onChange={() => updateSetting('autoUpdate', !settings.autoUpdate)}
              />
            </div>
          </div>
        </motion.div>

        {/* Guest Network */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-accent/10">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Guest Network</h3>
              <p className="text-xs text-slate-400">Separate network for visitors</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-slate-300">Enable Guest Network</p>
                <p className="text-xs text-slate-500">Create isolated guest access</p>
              </div>
              <Toggle
                enabled={settings.guestNetwork}
                onChange={() => updateSetting('guestNetwork', !settings.guestNetwork)}
              />
            </div>
            {settings.guestNetwork && (
              <>
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">Guest Network Name</label>
                  <input
                    type="text"
                    value={settings.guestNetworkName}
                    onChange={(e) => updateSetting('guestNetworkName', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 mb-1.5 block">Guest Password</label>
                  <input
                    type="text"
                    value={settings.guestPassword}
                    onChange={(e) => updateSetting('guestPassword', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Advanced Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-warning/10">
              <Globe className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Advanced</h3>
              <p className="text-xs text-slate-400">DNS, DHCP, and system settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 mb-1.5 block">DNS Server</label>
              <input
                type="text"
                value={settings.dnsServer}
                onChange={(e) => updateSetting('dnsServer', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">DHCP Start</label>
                <input
                  type="text"
                  value={settings.dhcpStart}
                  onChange={(e) => updateSetting('dhcpStart', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-sm text-slate-300 mb-1.5 block">DHCP End</label>
                <input
                  type="text"
                  value={settings.dhcpEnd}
                  onChange={(e) => updateSetting('dhcpEnd', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1.5 block">DHCP Lease Time (hours)</label>
              <input
                type="number"
                value={settings.leaseTime}
                onChange={(e) => updateSetting('leaseTime', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-slate-300">System Logging</p>
                <p className="text-xs text-slate-500">Collect and store system logs</p>
              </div>
              <Toggle
                enabled={settings.logging}
                onChange={() => updateSetting('logging', !settings.logging)}
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-slate-300">Notifications</p>
                <p className="text-xs text-slate-500">Alert on critical events</p>
              </div>
              <Toggle
                enabled={settings.notifications}
                onChange={() => updateSetting('notifications', !settings.notifications)}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
