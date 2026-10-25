export interface IAdminTutorialStat {
  title: string;
  value: string;
  description: string;
}

export interface IAdminTutorial {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  featured: boolean;
  status: string;
  lastUpdated: string;
}
