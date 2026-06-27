import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Driver, Job, AlertNotification, JobStatus, TimelineEvent } from '../types';

interface AppContextProps {
  theme: 'light' | 'dark';
  currentScreen: 'home' | 'jobs' | 'history' | 'profile' | 'login' | 'signup' | 'navigation' | 'active-job';
  setScreen: (screen: AppContextProps['currentScreen']) => void;
  driver: Driver | null;
  online: boolean;
  setOnline: (online: boolean) => void;
  availableJobs: Job[];
  activeJob: Job | null;
  historyJobs: Job[];
  alerts: AlertNotification[];
  addAlert: (title: string, desc: string, type: AlertNotification['type']) => void;
  markAlertsAsRead: () => void;
  acceptJob: (jobId: string) => void;
  rejectJob: (jobId: string) => void;
  startJourney: () => void;
  markArrived: () => void;
  startTrip: () => void;
  completeJob: () => void;
  toggleTheme: () => void;
  login: (email: string) => void;
  signup: (name: string, license: string, email: string, vehicleType: string) => void;
  logout: () => void;
  simulatedDistance: number; // Remaining distance in navigation (miles)
  simulatedETA: number;      // Remaining ETA (minutes)
  simulatedProgress: number;  // Progress percentage (0 - 100)
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialDriver: Driver = {
  name: 'Alex "Ace" Harrison',
  nickname: 'Ace',
  email: 'alex.harrison@velocity.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnTdJMWVBqvuCMLXAaGFBZEH2l03VWcDTs07bDeUnuWPN_8gKxPyzZ992cme6Up7ZBSZ5OtpJPmjUlHpE-3dxulDjLrYEsT7qBU6GGwK6RGI7SQoCMFnqDlhJ636_-2I4VXrETjAkyNFAspMJJ6hv3p9JR300q5NTDXkla3AoCcIFUKt0bxF_bv9OhZT_DCyAqZ8G1DcA6Uf749E1T9Rg-6ek4PpP6fkDn9NoWdjgTinCsGBh3g7flFKysfwivnVr7Nf_RYTS4OZI',
  licenseNumber: 'DX-9920-SMT',
  online: true,
  vehicle: {
    year: 2024,
    make: 'Rivian',
    model: 'EDV 500',
    plate: 'DSP-4402',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsPP5If55du1NjKL34Hz4mJZ2N5tYBDQvu0dyy9G8ZO6vJWmvfXPqpCBKVpt5OFg9SJdyL2cpXSqcTfoyE1H5dPn_Rbhe8Q_7ZY47G7Ub4eNPtpPghxSKMv80UWOefZoLTygULVmJjTM9xnXvUDH5Uh_3ndS5FaFzPbaO8-xggJl0Q7QfiwiNZrinLPjbdecGHXW1MiB3GWTvWPZVwOL-nZIAt2ifffC00CohjjAgskc2Su1gHsbPUjOiv1-E7-TW3oQbpPDtYkpw',
  },
  stats: {
    reliability: 98.4,
    totalMiles: 12450,
    todayEarnings: 285.50,
    weeklyEarnings: 1248.50,
    todayJobsCount: 14,
  }
};

const initialAvailableJobs: Job[] = [
  {
    id: 'SD-98421',
    title: 'Westside Logistics Hub',
    type: 'URGENT',
    pickupAddress: '442 Industrial Way, San Francisco',
    dropoffAddress: '892 Skyline Heights, Penthouse 4, Central District',
    distance: '2.4 miles',
    eta: '8 mins',
    payout: 38.50,
    itemsCount: 12,
    fragile: true,
    medical: false,
    customerName: 'Marcus Thorne',
    customerRating: 4.9,
    status: 'available',
    timeline: [
      { label: 'Order Received', time: '08:45 AM', status: 'completed' },
      { label: 'Heading to Pickup', status: 'pending' },
      { label: 'At Pickup Location', status: 'pending' },
      { label: 'Job Completed', status: 'pending' }
    ]
  },
  {
    id: 'SD-98435',
    title: 'Downtown Medical Center',
    type: 'SCHEDULED',
    pickupAddress: '890 Market St, San Francisco',
    dropoffAddress: 'Mission Health Annex, San Francisco',
    distance: '5.1 miles',
    eta: '15 mins',
    payout: 52.00,
    itemsCount: 4,
    fragile: false,
    medical: true,
    customerName: 'Dr. Sarah Lin',
    customerRating: 4.8,
    status: 'available',
    timeline: [
      { label: 'Order Confirmed', time: '09:00 AM', status: 'completed' },
      { label: 'Heading to Pickup', status: 'pending' },
      { label: 'At Pickup Location', status: 'pending' },
      { label: 'Job Completed', status: 'pending' }
    ]
  },
  {
    id: 'SD-98440',
    title: 'Port of SF Terminal 5',
    type: 'STANDARD',
    pickupAddress: 'Pier 50, San Francisco',
    dropoffAddress: 'Retail Hub 12, San Francisco',
    distance: '1.2 miles',
    eta: '4 mins',
    payout: 45.00,
    itemsCount: 20,
    fragile: false,
    medical: false,
    customerName: 'Terminal Manager Joe',
    customerRating: 4.5,
    status: 'available',
    timeline: [
      { label: 'Shipment Cleared', time: '09:15 AM', status: 'completed' },
      { label: 'Heading to Pickup', status: 'pending' },
      { label: 'At Pickup Location', status: 'pending' },
      { label: 'Job Completed', status: 'pending' }
    ]
  }
];

const initialHistoryJobs: Job[] = [
  {
    id: 'SD-99283-X',
    title: 'Port of Long Beach, Terminal A',
    type: 'STANDARD',
    pickupAddress: 'Port of Long Beach, Terminal A',
    dropoffAddress: 'Distribution Center #4, Irvine',
    distance: '24.5 miles',
    eta: '35 mins',
    payout: 142.50,
    itemsCount: 45,
    fragile: false,
    medical: false,
    customerName: 'Logistics Lead Chen',
    customerRating: 4.7,
    status: 'completed',
    startedAt: 'Oct 24, 2023',
    completedAt: 'Oct 24, 2023',
    timeline: []
  },
  {
    id: 'SD-98441-A',
    title: 'Logistics Hub, Fontana',
    type: 'HAZMAT',
    pickupAddress: 'Logistics Hub, Fontana',
    dropoffAddress: 'City Square Retail, Riverside',
    distance: '18.2 miles',
    eta: '28 mins',
    payout: 210.00,
    itemsCount: 8,
    fragile: false,
    medical: false,
    customerName: 'Hazmat Supervisor Dave',
    customerRating: 4.9,
    status: 'completed',
    startedAt: 'Oct 23, 2023',
    completedAt: 'Oct 23, 2023',
    timeline: []
  },
  {
    id: 'SD-98212-B',
    title: 'Downtown Hub, Los Angeles',
    type: 'STANDARD',
    pickupAddress: 'Downtown Hub, Los Angeles',
    dropoffAddress: 'Medical Plaza, Santa Monica',
    distance: '15.4 miles',
    eta: '22 mins',
    payout: 85.00,
    itemsCount: 15,
    fragile: true,
    medical: false,
    customerName: 'Sandra K.',
    customerRating: 4.6,
    status: 'completed',
    startedAt: 'Oct 23, 2023',
    completedAt: 'Oct 23, 2023',
    timeline: []
  }
];

const initialAlerts: AlertNotification[] = [
  {
    id: 'a1',
    title: 'Pickup Delayed',
    description: 'Route #442 - Terminal A traffic alert. 15min ETA increase.',
    time: '10 mins ago',
    read: false,
    type: 'delay',
  },
  {
    id: 'a2',
    title: 'Payment Processed',
    description: 'Weekly earnings for Dec 1-7 have been deposited.',
    time: '2 hours ago',
    read: false,
    type: 'payment',
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentScreen, setScreen] = useState<AppContextProps['currentScreen']>('login');
  const [driver, setDriver] = useState<Driver | null>(null); // Starts unauthenticated to let user use login/signup
  const [online, setOnlineState] = useState<boolean>(true);
  const [availableJobs, setAvailableJobs] = useState<Job[]>(initialAvailableJobs);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [historyJobs, setHistoryJobs] = useState<Job[]>(initialHistoryJobs);
  const [alerts, setAlerts] = useState<AlertNotification[]>(initialAlerts);

  // Navigation simulation states
  const [simulatedDistance, setSimulatedDistance] = useState<number>(12.4);
  const [simulatedETA, setSimulatedETA] = useState<number>(18);
  const [simulatedProgress, setSimulatedProgress] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const jobSpawnerRef = useRef<NodeJS.Timeout | null>(null);

  // Apply dark mode class to HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Simulated Socket.IO Real-time event spawner
  // When Online, spawn random jobs to simulate dispatch dispatching orders!
  useEffect(() => {
    if (online && driver) {
      jobSpawnerRef.current = setInterval(() => {
        // Chance to spawn a random job
        if (Math.random() > 0.4 && availableJobs.length < 5) {
          const randomId = Math.floor(Math.random() * 90000) + 10000;
          const locations = [
            'Bayview Fulfillment Center', 
            'SOMA Distribution Annex', 
            'Presidio Supply Hub', 
            'Sunset Retail Depot',
            'Oakland Logistics Depot'
          ];
          const drops = [
            'Financial District Offices',
            'Marina Tech Park',
            'Sutro Heights Labs',
            'Fisherman\'s Wharf Store',
            'Mission District Market'
          ];
          const loc = locations[Math.floor(Math.random() * locations.length)];
          const drop = drops[Math.floor(Math.random() * drops.length)];
          const dist = (Math.random() * 8 + 1).toFixed(1);
          const etaVal = Math.round(parseFloat(dist) * 4);
          const pay = parseFloat((Math.random() * 40 + 20).toFixed(2));
          const customers = ['Alice Vance', 'Bob Jenkins', 'Claire Redfield', 'Leon Kennedy', 'Robert Bruce'];
          const newJob: Job = {
            id: `SD-${randomId}`,
            title: loc,
            type: Math.random() > 0.6 ? 'URGENT' : Math.random() > 0.5 ? 'SCHEDULED' : 'STANDARD',
            pickupAddress: `${Math.floor(Math.random() * 900) + 100} Terminal Way, ${loc}, SF`,
            dropoffAddress: drop,
            distance: `${dist} miles`,
            eta: `${etaVal} mins`,
            payout: pay,
            itemsCount: Math.floor(Math.random() * 15) + 1,
            fragile: Math.random() > 0.7,
            medical: Math.random() > 0.8,
            customerName: customers[Math.floor(Math.random() * customers.length)],
            customerRating: parseFloat((Math.random() * 0.5 + 4.5).toFixed(1)),
            status: 'available',
            timeline: [
              { label: 'Order Received', time: 'Just Now', status: 'completed' },
              { label: 'Heading to Pickup', status: 'pending' },
              { label: 'At Pickup Location', status: 'pending' },
              { label: 'Job Completed', status: 'pending' }
            ]
          };

          setAvailableJobs(prev => [newJob, ...prev]);
          addAlert('New Dispatch Job Available!', `${newJob.type} job #${newJob.id} at ${newJob.title}. Payout: $${newJob.payout.toFixed(2)}`, 'info');
        }
      }, 25000); // Check every 25 seconds
    } else {
      if (jobSpawnerRef.current) clearInterval(jobSpawnerRef.current);
    }

    return () => {
      if (jobSpawnerRef.current) clearInterval(jobSpawnerRef.current);
    };
  }, [online, driver, availableJobs.length]);

  // Simulated GPS Drift Ticker when driver has active transit journey!
  useEffect(() => {
    if (currentScreen === 'navigation' && activeJob && activeJob.status === 'transit') {
      timerRef.current = setInterval(() => {
        setSimulatedDistance(prev => {
          if (prev <= 0.1) {
            // Arrived!
            if (timerRef.current) clearInterval(timerRef.current);
            // Auto update active job status
            setActiveJob(job => {
              if (!job) return null;
              const updatedTimeline = job.timeline.map((item, idx) => {
                if (idx === 1) return { ...item, status: 'completed' as const, time: 'Just Now' };
                if (idx === 2) return { ...item, status: 'current' as const };
                return item;
              });
              return {
                ...job,
                status: 'arrived',
                timeline: updatedTimeline
              };
            });
            addAlert('Arrived at Pickup!', 'You have arrived at the pickup location. Tap Mark Arrived to scan inventory.', 'info');
            return 0;
          }
          const nextDist = Math.max(0, parseFloat((prev - 0.2).toFixed(1)));
          const nextETA = Math.max(1, Math.round(nextDist * 1.5));
          const totalDist = parseFloat(activeJob.distance);
          const progress = Math.round(((totalDist - nextDist) / totalDist) * 100);
          setSimulatedETA(nextETA);
          setSimulatedProgress(progress);
          return nextDist;
        });
      }, 1500); // Speed up location tick for demonstration purposes (every 1.5s is a drift!)
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentScreen, activeJob]);

  const setOnline = (online: boolean) => {
    setOnlineState(online);
    if (driver) {
      setDriver({
        ...driver,
        online
      });
    }
    addAlert(
      online ? 'Shift Started' : 'Shift Paused',
      online ? 'You are now online and accepting dispatch jobs.' : 'Shift paused. You will not receive new jobs.',
      'info'
    );
  };

  const addAlert = (title: string, description: string, type: AlertNotification['type']) => {
    const newAlert: AlertNotification = {
      id: `alert-${Date.now()}`,
      title,
      description,
      time: 'Just Now',
      read: false,
      type
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const markAlertsAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const acceptJob = (jobId: string) => {
    const job = availableJobs.find(j => j.id === jobId);
    if (!job) return;

    // Set timeline "Heading to Pickup" to active/current
    const acceptedJob: Job = {
      ...job,
      status: 'accepted',
      timeline: job.timeline.map((item, idx) => {
        if (idx === 1) return { ...item, status: 'current' as const };
        return item;
      })
    };

    setActiveJob(acceptedJob);
    setAvailableJobs(prev => prev.filter(j => j.id !== jobId));
    
    // Set navigation initial values
    const distVal = parseFloat(acceptedJob.distance) || 12.4;
    setSimulatedDistance(distVal);
    setSimulatedETA(Math.round(distVal * 1.5));
    setSimulatedProgress(0);

    setScreen('active-job');
    addAlert('Job Accepted', `Order #${acceptedJob.id} is now assigned to you. Proceed to ${acceptedJob.pickupAddress}.`, 'info');
  };

  const rejectJob = (jobId: string) => {
    setAvailableJobs(prev => prev.filter(j => j.id !== jobId));
    addAlert('Job Rejected', `Job #${jobId} has been removed from your feed.`, 'info');
  };

  const startJourney = () => {
    if (!activeJob) return;
    
    setActiveJob({
      ...activeJob,
      status: 'transit',
    });
    setScreen('navigation');
  };

  const markArrived = () => {
    if (!activeJob) return;

    const updatedTimeline = activeJob.timeline.map((item, idx) => {
      if (idx === 0 || idx === 1) return { ...item, status: 'completed' as const };
      if (idx === 2) return { ...item, status: 'completed' as const, time: 'Just Now' };
      if (idx === 3) return { ...item, status: 'current' as const };
      return item;
    });

    setActiveJob({
      ...activeJob,
      status: 'arrived',
      timeline: updatedTimeline
    });
    setScreen('active-job');
    addAlert('Arrived at Location', 'Loading completed. You can now start the trip to final delivery destination.', 'info');
  };

  const startTrip = () => {
    if (!activeJob) return;

    setActiveJob({
      ...activeJob,
      status: 'delivering',
    });
    setScreen('navigation');
    addAlert('Trip Started', `In transit to dropoff address. Navigate to customer destination.`, 'info');
  };

  const completeJob = () => {
    if (!activeJob || !driver) return;

    const finalJob: Job = {
      ...activeJob,
      status: 'completed',
      completedAt: 'Today',
      timeline: activeJob.timeline.map(item => ({ ...item, status: 'completed' }))
    };

    setHistoryJobs(prev => [finalJob, ...prev]);
    
    // Update driver earnings and job counts
    const newTodayEarnings = driver.stats.todayEarnings + finalJob.payout;
    const newWeeklyEarnings = driver.stats.weeklyEarnings + finalJob.payout;
    const newJobsCount = driver.stats.todayJobsCount + 1;
    const newTotalMiles = driver.stats.totalMiles + parseFloat(finalJob.distance);

    setDriver({
      ...driver,
      stats: {
        ...driver.stats,
        todayEarnings: parseFloat(newTodayEarnings.toFixed(2)),
        weeklyEarnings: parseFloat(newWeeklyEarnings.toFixed(2)),
        todayJobsCount: newJobsCount,
        totalMiles: parseFloat(newTotalMiles.toFixed(1))
      }
    });

    setActiveJob(null);
    setScreen('home');
    addAlert('Job Completed!', `Successfully delivered! $${finalJob.payout.toFixed(2)} has been added to your balance.`, 'payment');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = (email: string) => {
    // Authenticate with mock driver
    setDriver({
      ...initialDriver,
      email: email || 'alex.harrison@velocity.com'
    });
    setScreen('home');
    addAlert('Welcome Back!', 'Ready for your shift? Toggle Online to receive dispatch jobs.', 'info');
  };

  const signup = (name: string, license: string, email: string, vehicleType: string) => {
    // Register details
    const mapping: Record<string, string> = {
      box_truck: 'Box Truck Premium',
      cargo_van: 'Cargo Van Utility',
      flatbed: 'Flatbed Carrier',
      semi: 'Semi-Trailer HeavyDuty'
    };

    const formattedVehicle = mapping[vehicleType] || 'Delivery Van';

    setDriver({
      ...initialDriver,
      name,
      licenseNumber: license,
      email,
      vehicle: {
        ...initialDriver.vehicle,
        model: formattedVehicle,
      }
    });
    setScreen('home');
    addAlert('Registration Complete', 'Welcome to the Smart Dispatch network! Drive safely.', 'info');
  };

  const logout = () => {
    setDriver(null);
    setActiveJob(null);
    setScreen('login');
  };

  return (
    <AppContext.Provider value={{
      theme,
      currentScreen,
      setScreen,
      driver,
      online,
      setOnline,
      availableJobs,
      activeJob,
      historyJobs,
      alerts,
      addAlert,
      markAlertsAsRead,
      acceptJob,
      rejectJob,
      startJourney,
      markArrived,
      startTrip,
      completeJob,
      toggleTheme,
      login,
      signup,
      logout,
      simulatedDistance,
      simulatedETA,
      simulatedProgress
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
