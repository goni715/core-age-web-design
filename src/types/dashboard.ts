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

export interface ISubAgentDashboardBreakdown {
  all?: number;
  submitted?: number;
  underReview?: number;
  confirmed?: number;
  ongoing?: number;
  completed?: number;
  cancelled?: number;
  [key: string]: number | undefined;
}

export interface ISubAgentDashboardStats {
  myTotalCases: number;
  ongoingTreatment: number;
  completedCases: number;
  myReferralEarnings: number;
  currency?: string;
  breakdown?: ISubAgentDashboardBreakdown;
}

export interface ISubAgentDashboardStatsResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  data: ISubAgentDashboardStats;
}
