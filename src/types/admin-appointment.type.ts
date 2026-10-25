export interface IAdminAppointmentStat {
  title: string;
  value: string;
  iconColor: string;
  bgColor: string;
}

export interface IAdminAppointment {
  id: string;
  bookingId: string;
  patient: string;
  doctor: string;
  hospital: string;
  date: string;
  time: string;
  type: string;
  payment: string;
  status: string;
  symptoms?: string;
  timeline?: { status: string; date?: string; active: boolean }[];
}
