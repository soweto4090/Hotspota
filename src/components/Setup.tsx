import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  HardDrive,
  Network,
  Globe,
  Container,
  Shield,
  Activity,
  Users,
  Terminal,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Rocket,
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  details: string[];
  command?: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Set up a Virtual Machine',
    description: 'Use Compute Engine to provision a VM instance as the hotspot server core.',
    icon: Server,
    color: 'from-blue-500 to-blue-600',
    details: [
      'Select an appropriate machine type (e.g., e2-medium for basic, n2-standard-4 for production)',
      'Choose an OS image (Ubuntu 22.04 LTS recommended)',
      'Configure boot disk size (minimum 30GB)',
      'Enable HTTP/HTTPS firewall rules',
      'Set up service account with appropriate permissions',
    ],
    command: 'gcloud compute instances create hotspot-server \\\n  --zone=us-central1-a \\\n  --machine-type=e2-medium \\\n  --image-family=ubuntu-2204-lts \\\n  --image-project=ubuntu-os-cloud \\\n  --boot-disk-size=30GB',
  },
  {
    id: 2,
    title: 'Configure Storage',
    description: 'Attach Persistent Disk for OS, hotspot software, and configuration files.',
    icon: HardDrive,
    color: 'from-emerald-500 to-emerald-600',
    details: [
      'Create a persistent disk for data storage',
      'Format and mount the disk to the VM',
      'Set up automatic snapshots for backup',
      'Configure disk performance tier based on IOPS needs',
    ],
    command: 'gcloud compute disks create hotspot-data \\\n  --size=100GB \\\n  --type=pd-ssd \\\n  --zone=us-central1-a',
  },
  {
    id: 3,
    title: 'Establish Network Infrastructure',
    description: 'Create a VPC network with subnets and firewall rules for traffic control.',
    icon: Network,
    color: 'from-purple-500 to-purple-600',
    details: [
      'Create a custom VPC network',
      'Define subnet IP ranges',
      'Configure firewall rules for hotspot traffic',
      'Set up NAT gateway for outbound traffic',
      'Configure load balancer if needed',
    ],
    command: 'gcloud compute networks create hotspot-vpc \\\n  --subnet-mode=custom\n\ngcloud compute networks subnets create hotspot-subnet \\\n  --network=hotspot-vpc \\\n  --region=us-central1 \\\n  --range=10.0.1.0/24',
  },
  {
    id: 4,
    title: 'Manage DNS',
    description: 'Configure Cloud DNS for custom domain mapping to your hotspot.',
    icon: Globe,
    color: 'from-amber-500 to-amber-600',
    details: [
      'Create a managed DNS zone',
      'Add A records pointing to your VM external IP',
      'Configure DNSSEC for additional security',
      'Set up reverse DNS records',
    ],
    command: 'gcloud dns managed-zones create hotspot-zone \\\n  --dns-name="hotspot.example.com" \\\n  --description="Hotspot DNS zone"\n\ngcloud dns record-sets create hotspot.example.com \\\n  --zone=hotspot-zone \\\n  --type=A \\\n  --ttl=300 \\\n  --rrdatas=35.192.0.147',
  },
  {
    id: 5,
    title: 'Deploy Hotspot Application',
    description: 'Install and configure hotspot software on the Compute Engine instance.',
    icon: Container,
    color: 'from-cyan-500 to-cyan-600',
    details: [
      'Push container images to Artifact Registry',
      'Install hotspot management software (CoovaChilli, OpenNDS, etc.)',
      'Configure captive portal for user authentication',
      'Set up bandwidth management and QoS',
      'Configure RADIUS server integration',
    ],
    command: '# Push to Artifact Registry\ngcloud artifacts repositories create hotspot-images \\\n  --repository-format=docker \\\n  --location=us-central1\n\n# Deploy container\ngcloud compute ssh hotspot-server -- \\\n  "docker pull us-central1-docker.pkg.dev/project/hotspot-images/server:latest"',
  },
  {
    id: 6,
    title: 'Secure Access to the VM',
    description: 'Use Identity-Aware Proxy (IAP) to secure administrative access.',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    details: [
      'Enable IAP for the VM instance',
      'Configure IAM policies for admin access',
      'Set up OS Login for SSH authentication',
      'Enable two-factor authentication',
      'Configure audit logging for access events',
    ],
    command: 'gcloud compute firewall-rules create allow-iap \\\n  --direction=INGRESS \\\n  --action=allow \\\n  --rules=tcp:22 \\\n  --source-ranges=35.235.240.0/20 \\\n  --network=hotspot-vpc',
  },
  {
    id: 7,
    title: 'Monitor and Log Operations',
    description: 'Implement Cloud Monitoring and Logging for operational visibility.',
    icon: Activity,
    color: 'from-indigo-500 to-indigo-600',
    details: [
      'Set up Cloud Monitoring dashboards',
      'Configure alerting policies for CPU, memory, and network',
      'Enable Cloud Logging for system and application logs',
      'Create log-based metrics',
      'Set up log exports to Cloud Storage for archival',
    ],
    command: 'gcloud logging sinks create hotspot-logs \\\n  bigquery.googleapis.com/projects/project/datasets/hotspot_logs \\\n  --log-filter=\'resource.type="gce_instance"\'',
  },
  {
    id: 8,
    title: 'Manage Identities and Permissions',
    description: 'Use Cloud Identity to manage user access and permissions.',
    icon: Users,
    color: 'from-pink-500 to-pink-600',
    details: [
      'Create user groups for different access levels',
      'Assign IAM roles to groups',
      'Set up conditional access policies',
      'Configure service account key management',
    ],
    command: 'gcloud iam service-accounts create hotspot-sa \\\n  --display-name="Hotspot Service Account"\n\ngcloud projects add-iam-policy-binding project \\\n  --member="serviceAccount:hotspot-sa@project.iam.gserviceaccount.com" \\\n  --role="roles/compute.admin"',
  },
  {
    id: 9,
    title: 'Automate with Cloud SDK',
    description: 'Use Cloud SDK for programmatic management of all resources.',
    icon: Terminal,
    color: 'from-teal-500 to-teal-600',
    details: [
      'Install and configure gcloud CLI',
      'Create deployment scripts for infrastructure',
      'Set up CI/CD pipelines for updates',
      'Automate scaling policies',
      'Create backup and disaster recovery scripts',
    ],
    command: '# Install Cloud SDK\ncurl https://sdk.cloud.google.com | bash\n\n# Initialize and authenticate\ngcloud init\ngcloud auth login\n\n# Deploy full stack\n./deploy-hotspot.sh --env=production',
  },
];

export default function Setup() {
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedCommand, setCopiedCommand] = useState<number | null>(null);

  const toggleStep = (id: number) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const toggleComplete = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const copyCommand = (id: number, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Setup Guide</h1>
          <p className="text-slate-400 mt-1">Deploy your virtual hotspot on Google Cloud</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{completedSteps.length}/{steps.length} steps completed</p>
            <p className="text-xs text-slate-400">{Math.round(progress)}% progress</p>
          </div>
          <div className="w-12 h-12 rounded-full border-3 border-white/10 relative">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="15"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2.5"
              />
              <circle
                cx="18" cy="18" r="15"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeDasharray={`${progress * 0.942} 94.2`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/5 rounded-full h-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isExpanded = expandedStep === step.id;
          const isCompleted = completedSteps.includes(step.id);

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl border transition-all duration-200 ${
                isExpanded
                  ? 'bg-white/[0.07] border-primary/30'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Step Header */}
              <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => toggleStep(step.id)}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center ${isCompleted ? 'opacity-50' : ''}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-mono">Step {step.id}</span>
                    {isCompleted && (
                      <span className="text-xs text-success bg-success/10 px-1.5 py-0.5 rounded">Complete</span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-white mt-0.5">{step.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{step.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(step.id);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isCompleted ? 'bg-success/10 text-success' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
                </button>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-4 pb-4"
                >
                  <div className="ml-14 space-y-4">
                    <div className="space-y-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-light mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-slate-300">{detail}</p>
                        </div>
                      ))}
                    </div>
                    {step.command && (
                      <div className="relative">
                        <div className="flex items-center justify-between px-3 py-2 bg-surface-dark rounded-t-lg border border-white/10 border-b-0">
                          <span className="text-xs text-slate-400 font-mono">Terminal</span>
                          <button
                            onClick={() => copyCommand(step.id, step.command!)}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                          >
                            {copiedCommand === step.id ? (
                              <>
                                <Check className="w-3 h-3" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 bg-surface-dark/80 rounded-b-lg border border-white/10 border-t-0 overflow-x-auto">
                          <code className="text-xs text-green-400 font-mono whitespace-pre">
                            {step.command}
                          </code>
                        </pre>
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
