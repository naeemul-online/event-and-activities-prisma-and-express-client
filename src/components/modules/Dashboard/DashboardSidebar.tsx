import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  if (!userInfo) return null;

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);

  return <DashboardSidebarContent userInfo={userInfo} navItems={navItems} />;
};

export default DashboardSidebar;
