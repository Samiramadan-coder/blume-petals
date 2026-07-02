import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

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
      className="h-11 text-foreground font-semibold bg-primary hover:bg-primary"
    >
      {isLoading ? <Spinner /> : label}
    </Button>
  );
}
