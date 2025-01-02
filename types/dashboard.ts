export interface AppointmentStats {
  day: string;
  total: number;
}

export interface RevenueByCategory {
  category: string;
  revenue: number;
}

export interface AppointmentStatus {
  status: string;
  count: number;
}

export interface DashboardData {
  appointmentStats: AppointmentStats[];
  revenueByCategory: RevenueByCategory[];
  appointmentStatus: AppointmentStatus[];
} 