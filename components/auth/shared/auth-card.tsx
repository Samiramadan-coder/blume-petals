import { Card, CardContent } from "@/components/ui/card";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-115 max-w-full mx-4 rounded-3xl shadow-2xl">
      <CardContent className="px-6 py-4 md:py-8 md:px-10">
        {children}
      </CardContent>
    </Card>
  );
}
