export interface IPrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface IPrescription {
  doctorName: string;
  doctorDetails: string;
  patientName: string;
  patientDetails: string;
  diagnosis: string;
  medicines: IPrescriptionMedicine[];
}
