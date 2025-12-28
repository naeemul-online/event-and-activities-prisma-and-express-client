import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavbarAuthButtons from "./NavAuthButton";

export async function PublicNavbar() {
  const navItems = [
    { href: "/events", label: "Explore Events" },
    { href: "/host/dashboard/my-events", label: "Become a Host" },
  ];

  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Events & Activities
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="hidden md:flex items-center space-x-2">
              <NavbarAuthButtons
                initialHasToken={!!accessToken}
                initialUserInfo={userInfo}
                initialDashboardRoute={dashboardRoute}
              />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <MobileMenu
            navItems={navItems}
            hasAccessToken={!!accessToken}
            userInfo={userInfo}
            dashboardRoute={dashboardRoute}
          />
        </div>
      </div>
    </header>
  );
}
