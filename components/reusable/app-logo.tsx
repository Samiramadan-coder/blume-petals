import { Link } from "@/i18n/navigation";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

export default function AppLogo({
  width,
  preload = true,
}: {
  width: number;
  // Pass false for logos below the fold so they lazy-load instead.
  preload?: boolean;
}) {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="Blúme Petals"
        width={logo.width}
        height={logo.height}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        className="h-auto"
        sizes={`${width}px`}
        style={{ width }}
      />
    </Link>
  );
}
