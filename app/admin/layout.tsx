import { Dashboard } from "@/components/shared/Dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
