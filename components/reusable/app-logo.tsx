import { Link } from "@/i18n/navigation";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

export default function AppLogo({ width }: { width: number }) {
  return (
    <Link href={"/"}>
      <Image src={logo} alt="Blúme Petals" width={width} />
    </Link>
  );
}
