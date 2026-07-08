import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function AuthSubmitBtn({
  isLoading,
  label,
}: {
  isLoading: boolean;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      type="submit"
      className="h-12 text-base text-foreground font-semibold bg-primary hover:bg-primary cursor-pointer"
    >
      {isLoading ? <Spinner /> : label}
    </Button>
  );
}
