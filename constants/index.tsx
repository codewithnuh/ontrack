import { Home, LineChart, Package2, Users2 } from "lucide-react";
export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: <Home />,
    link: "/admin/dashboard",
  },
  {
    title: "My Habits",
    icon: <Users2 />,
    link: "/admin/habits",
  },
  {
    title: "Progress",
    icon: <LineChart />,
    link: "/admin/progress",
  },
  {
    title: "Goals",
    icon: <Package2 />,
    link: "/admin/goals",
  },
];
