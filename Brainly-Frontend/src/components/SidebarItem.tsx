import { ReactElement } from "react";
<<<<<<< HEAD
import { motion } from "framer-motion";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  isSelected?: boolean;
  onClick?: () => void;
}
=======
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57

export function SidebarItem({
  text,
  icon,
<<<<<<< HEAD
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
=======
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex items-center text-white py-2 cursor-pointer hover:bg-gray-700 rounded-lg max-w-48 pl-4 pr-2 gap-4 transition-all duration-200">
      <div>{icon}</div>
      <div className="text-lg font-medium">{text}</div>
    </div>
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
  );
}
