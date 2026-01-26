"use client";

import { LucideIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface ManagementPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    icon?: LucideIcon;
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
  mode?: "ADMIN" | "HOST" | "USER";
}

const ManagementPageHeader = ({
  title,
  description,
  action,
  children,
  mode,
}: ManagementPageHeaderProps) => {
  const Icon = action?.icon ?? Plus;
  const canShowAction = mode === "HOST" && action;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {canShowAction && (
        <Button onClick={action.onClick}>
          <Icon className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}

      {children}
    </div>
  );
};

export default ManagementPageHeader;
