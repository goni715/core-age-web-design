export interface IDoctorReport {
  id: string;
  name: string;
  patient: string;
  date: string;
  active: boolean;
  pending?: boolean;
}

export interface IReportDetail {
  hospitalName: string;
  reportName: string;
  patientName: string;
  age: string;
  gender: string;
  reportDate: string;
  ecg: string;
  bloodPressure: string;
  heartRate: string;
  cholesterol: string;
  summary: string;
}
