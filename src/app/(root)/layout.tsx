import { SiderBar } from "@/components";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiderBar>{children}</SiderBar>;
}
