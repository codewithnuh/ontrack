import { Sidebar } from "@/components/shared/Sidebar";
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
  return <Sidebar>{children}</Sidebar>;
}
