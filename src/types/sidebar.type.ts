
export interface ISubNavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface INavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children?: ISubNavItem[];
}