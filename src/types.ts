export interface Vehicle {
  year: number;
  make: string;
  model: string;
  plate: string;
  image: string;
}

export interface DriverStats {
  reliability: number;
  totalMiles: number;
  todayEarnings: number;
  weeklyEarnings: number;
  todayJobsCount: number;
}

export interface Driver {
  name: string;
  nickname: string;
  email: string;
  avatar: string;
  licenseNumber: string;
  online: boolean;
  vehicle: Vehicle;
  stats: DriverStats;
}

export type JobStatus = 
  | 'available' 
  | 'accepted' 
  | 'transit' 
  | 'arrived' 
  | 'delivering' 
  | 'completed' 
  | 'rejected';

export interface TimelineEvent {
  label: string;
  time?: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Job {
  id: string;
  title: string;
  type: 'URGENT' | 'SCHEDULED' | 'STANDARD' | 'HAZMAT';
  pickupAddress: string;
  dropoffAddress: string;
  distance: string; // e.g. "2.4 miles"
  eta: string; // e.g. "8 mins"
  payout: number;
  itemsCount: number;
  fragile: boolean;
  medical: boolean;
  customerName: string;
  customerRating: number;
  status: JobStatus;
  timeline: TimelineEvent[];
  startedAt?: string;
  completedAt?: string;
}

export interface AlertNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'delay' | 'payment' | 'info';
}
