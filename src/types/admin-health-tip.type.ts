export interface IAdminHealthTipStat {
  title: string;
  value: string;
  description: string;
}

export interface IAdminHealthTip {
  id: string;
  title: string;
  category: string;
  language: string;
  readTime: string;
  featured: boolean;
  publishDate: string;
  status: string;
}
