import { Logo } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="h-screen bg-gradient-to-b from-purple-800 to-gray-800 text-white w-72 fixed left-0 top-0 pl-6">
      <div className="flex items-center text-3xl pt-8">
        <div className="pr-2 text-purple-400">
          <Logo />
        </div>
        <span className="font-extrabold text-white">Brainly</span>
      </div>

      <div className="pt-12 pl-4 space-y-6">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}
