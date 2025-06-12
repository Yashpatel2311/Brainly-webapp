import { ReactElement } from "react";
import { motion } from "framer-motion";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  isSelected?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  text,
  icon,
  isSelected,
  onClick,
}: SidebarItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center text-white py-2 cursor-pointer rounded-lg max-w-48 pl-4 pr-2 gap-4 transition-all duration-200 ${
        isSelected ? "bg-purple-600" : "hover:bg-gray-700"
      }`}
    >
      <div className={isSelected ? "text-purple-200" : ""}>{icon}</div>
      <div
        className={`text-lg font-medium ${isSelected ? "text-purple-200" : ""}`}
      >
        {text}
      </div>
    </motion.div>
  );
}
