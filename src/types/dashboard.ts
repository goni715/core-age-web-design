/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDashboardStats {
  totalDoctors?: number;
  totalHospitals?: number;
  totalPatients?: number;
  totalAppointments?: number;
  totalMedicineRequests?: number;
  totalReports?: number;
  totalTravelRequests?: number;
  totalHotels?: number;
  totalHealthTips?: number;
  totalTutorials?: number;
  totalSupportTickets?: number;
  totalRevenue?: number;
  [key: string]: any;
}

export interface IDashboardStatsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IDashboardStats;
}
