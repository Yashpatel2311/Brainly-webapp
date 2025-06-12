import { Logo } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
<<<<<<< HEAD
import { motion } from "framer-motion";

interface SidebarProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

export function Sidebar({ selectedType, onSelectType }: SidebarProps) {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="h-screen bg-gradient-to-b from-purple-800 to-gray-800 text-white w-72 fixed left-0 top-0 pl-6"
    >
=======

export function Sidebar() {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-800 to-gray-800 text-white w-72 fixed left-0 top-0 pl-6">
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
      <div className="flex items-center text-3xl pt-8">
        <div className="pr-2 text-purple-400">
          <Logo />
        </div>
        <span className="font-extrabold text-white">Brainly</span>
      </div>

      <div className="pt-12 pl-4 space-y-6">
<<<<<<< HEAD
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <SidebarItem
            text="All"
            icon={<Logo />}
            isSelected={selectedType === null}
            onClick={() => onSelectType(null)}
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <SidebarItem
            text="Twitter"
            icon={<TwitterIcon />}
            isSelected={selectedType === "twitter"}
            onClick={() => onSelectType("twitter")}
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <SidebarItem
            text="Youtube"
            icon={<YoutubeIcon />}
            isSelected={selectedType === "youtube"}
            onClick={() => onSelectType("youtube")}
          />
        </motion.div>
      </div>
    </motion.div>
=======
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
  );
}
