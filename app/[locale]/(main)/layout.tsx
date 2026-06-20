import AppFooter from "@/components/reusable/app-footer";
import AppHeader from "@/components/reusable/app-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AppHeader />
      {children}
      <AppFooter />
    </main>
  );
}
