import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "HOST", "ADMIN"],
        },
        {
          title: "Profile",
          href: "/profile",
          icon: "User",
          roles: ["USER", "HOST", "ADMIN"],
        },
      ],
    },
  ];
};

export const hostNavItems: NavSection[] = [
  {
    title: "Event Management",
    items: [
      {
        title: "My Events",
        href: "/host/dashboard/my-events",
        icon: "Calendar", // ✅ String
        badge: "3",
        roles: ["HOST"],
      },
    ],
  },
];

export const userNavItems: NavSection[] = [
  {
    title: "Events",
    items: [
      {
        title: "My Event",
        href: "/user/dashboard/my-events",
        icon: "Calendar", // ✅ String
        roles: ["USER"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/manage-users",
        icon: "User", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Hosts",
        href: "/admin/dashboard/manage-hosts",
        icon: "Album", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Events",
        href: "/admin/dashboard/manage-events",
        icon: "Calendar", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "HOST":
      return [...commonNavItems, ...hostNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
