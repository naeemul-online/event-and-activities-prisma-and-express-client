import { Sparkles } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      {/* Logo */}
      <Link href="/" className="flex justify-center items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg transition-colors text-foreground">
          Events<span className="text-accent">&</span>Activities
        </span>
      </Link>
    </>
  );
};

export default Logo;
