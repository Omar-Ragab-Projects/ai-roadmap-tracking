import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackTo({ href }: { href: string }) {
  return (
    <Link href={href}>
      <ArrowLeft
        size={16}
        strokeWidth={3.2}
        className="text-primary cursor-pointer hover:opacity-90 transition-all "
      />
    </Link>
  );
}
