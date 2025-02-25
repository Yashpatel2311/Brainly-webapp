import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex items-center text-white py-2 cursor-pointer hover:bg-gray-700 rounded-lg max-w-48 pl-4 pr-2 gap-4 transition-all duration-200">
      <div>{icon}</div>
      <div className="text-lg font-medium">{text}</div>
    </div>
  );
}
