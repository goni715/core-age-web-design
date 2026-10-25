export interface IAppointmentStat {
  title: string;
  value: number;
}

export interface IAppointment {
  id: string;
  patient: string;
  date: string;
  duration: string;
  type: string;
  symptoms: string;
  reports: number;
  status: string;
}
