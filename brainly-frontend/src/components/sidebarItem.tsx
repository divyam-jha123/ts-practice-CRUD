import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
}

export const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
      <span className="text-gray-500">{props.icon}</span>
      <span className="text-base font-medium">{props.text}</span>
    </div>
  );
};
