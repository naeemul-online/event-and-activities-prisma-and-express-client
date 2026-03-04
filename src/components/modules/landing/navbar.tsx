"use client";

import { Button } from "@/components/ui/button";
import { useAuthToken } from "@/hooks/useAuthHooks";
import { UserInfo } from "@/types/user.interface";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Events", href: "/events" },
  { label: "Become a Host", href: "/host/dashboard/my-events" },
];

interface NavbarAuthButtonsProps {
  initialHasToken: boolean;
  initialUserInfo: UserInfo | null;
  initialDashboardRoute: string;
}

export function Navbar({
  initialHasToken,
  initialUserInfo,
  initialDashboardRoute,
}: NavbarAuthButtonsProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const clientHasToken = useAuthToken();

  // Use client token state if available, otherwise fall back to server state
  const hasToken = clientHasToken || initialHasToken;
  const userInfo = hasToken ? initialUserInfo : null;
  const dashboardRoute = initialDashboardRoute;

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
          : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span
              className={`font-bold text-lg transition-colors ${
                isHomePage
                  ? isScrolled
                    ? "text-foreground"
                    : "text-background"
                  : "text-foreground"
              }`}
            >
              Events<span className="text-accent">&</span>Activities
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isHomePage
                    ? isScrolled
                      ? "text-muted-foreground"
                      : "text-background/80"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}

          <div className="hidden lg:flex items-center gap-3">
            {hasToken && userInfo ? (
              <>
                <Link href={dashboardRoute}>
                  <Button variant="outline" className="gap-2">
                    Dashboard
                  </Button>
                </Link>
                {/* UserDropdown component can be added here */}
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`text-sm ${
                      isHomePage
                        ? isScrolled
                          ? "text-foreground hover:text-primary"
                          : "text-background hover:text-background hover:bg-background/10"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-5"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  isHomePage
                    ? isScrolled
                      ? "text-foreground"
                      : "text-background"
                    : "text-foreground"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isHomePage
                    ? isScrolled
                      ? "text-foreground"
                      : "text-background"
                    : "text-foreground"
                }`}
              />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background rounded-b-2xl shadow-lg">
            <div className="flex flex-col gap-2 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-foreground px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-2">
                {hasToken && userInfo ? (
                  <>
                    <Link href={dashboardRoute}>
                      <Button variant="outline" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    {/* UserDropdown component can be added here */}
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
