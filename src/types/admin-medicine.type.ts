export interface IAdminMedicineStat {
  title: string;
  value: string;
  description: string;
}

export interface IAdminMedicine {
  id: string;
  name: string;
  purpose: string;
  genericName: string;
  usage: string;
  country: string;
  alternatives: string[];
  price: string;
  stock: string;
  status: string;
}
