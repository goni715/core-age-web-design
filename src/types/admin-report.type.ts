export interface IAdminReportStat {
  title: string;
  value: string;
  iconColor: string;
  bgColor: string;
}

export interface IAdminReport {
  id: string;
  reportName: string;
  reportType: string;
  patient: string;
  hospital: string;
  doctor: string;
  uploadDate: string;
  status: string;
  fileSize: string;
  patientInfo: {
    dob: string;
    age: string;
    gender: string;
  };
  relatedReports: string[];
}
