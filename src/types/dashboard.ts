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

export interface IAgentDashboardStats {
  totalPatients: number;
  referralPartners: number;
  ongoingCases: number;
  completed: number;
  completedCases?: number;
  networkEarnings: number;
  totalEarnings?: number;
  currency?: string;
  [key: string]: any;
}

export interface IAgentDashboardStatsResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  data: IAgentDashboardStats;
}

export interface IAgentMonthlyReferralItem {
  month: string;
  monthNumber: number;
  referrals: number;
  cases: number;
  count: number;
  [key: string]: any;
}

export interface IAgentMonthlyReferralsData {
  year: number;
  totalReferrals: number;
  totalCases: number;
  averageCasesPerMonth: number;
  averageCasesPerMonthFormatted: string;
  monthlyData: IAgentMonthlyReferralItem[];
  [key: string]: any;
}

export interface IAgentMonthlyReferralsResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  data: IAgentMonthlyReferralsData;
}
