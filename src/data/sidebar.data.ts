import {
  LayoutDashboard,
  Share2,
  Users,
  Globe,
  MessageSquare,
  User,
  UserPlus,
} from "lucide-react";
import TkIcon from "@/components/icons/TkIcon";

export const agentSidebarLinks = [
  { name: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
  { name: "My Network", href: "/agent/my-network", icon: Share2 },
  { name: "Patients", href: "/agent/patients", icon: Users },
  { name: "Submit Patient", href: "/agent/submit-patient", icon: UserPlus },
  { name: "Commission", href: "/agent/commission", icon: TkIcon },
  { name: "Healthcare Network", href: "/agent/healthcare-network", icon: Globe },
  { name: "Support", href: "/agent/support", icon: MessageSquare },
  { name: "Profile", href: "/agent/profile", icon: User },
];

export const subAgentSidebarLinks = [
  { name: "Dashboard", href: "/sub-agent/dashboard", icon: LayoutDashboard },
  { name: "My Cases", href: "/sub-agent/patients", icon: Users },
  { name: "Submit Patient", href: "/sub-agent/submit-patient", icon: UserPlus },
  { name: "Earnings", href: "/sub-agent/commission", icon: TkIcon },
  { name: "Healthcare Network", href: "/sub-agent/healthcare-network", icon: Globe },
  { name: "Support", href: "/sub-agent/support", icon: MessageSquare },
  { name: "Profile", href: "/sub-agent/profile", icon: User },
];

export const sidebarLinks = agentSidebarLinks;