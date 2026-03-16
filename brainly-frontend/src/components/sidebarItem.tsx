import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-md cursor-pointer transition-colors ${
        props.isActive
          ? "bg-purple-50 text-purple-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className={props.isActive ? "text-purple-600" : "text-gray-500"}>
        {props.icon}
      </span>
      <span className="text-base font-medium">{props.text}</span>
    </div>
  );
};
