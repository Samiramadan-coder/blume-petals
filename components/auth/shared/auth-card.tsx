import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-115 max-w-full mx-4 rounded-3xl shadow-2xl">
      <CardContent className="p-8">{children}</CardContent>
    </Card>
  );
}
