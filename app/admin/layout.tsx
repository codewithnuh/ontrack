import { Dashboard } from "@/components/shared/Dashboard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "admin",
  description:
    "OnTrack is a platform which helps you to build positive habits more easily ",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
