import { Footer } from "@/components/modules/landing/footer";
import { Navbar } from "@/components/modules/landing/navbar";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/services/auth/tokenHandlers";

const EventLayout = async ({ children }: { children: React.ReactNode }) => {
  const userInfo = (await getUserInfo()) || null;

  const accessToken = await getCookie("accessToken");

  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";
  return (
    <div className="max-w-7xl mx-auto min-h-screen py-8">
      {/* <PublicNavbar /> */}
      <Navbar
        initialHasToken={!!accessToken}
        initialUserInfo={userInfo}
        initialDashboardRoute={dashboardRoute}
      />

      {children}

      <Footer />
    </div>
  );
};

export default EventLayout;
