import { SidebarItem } from "./sidebarItem";
import { BrainIcon } from "../icons/brainIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { VideoIcon } from "../icons/videoIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { LinkIcon } from "../icons/linkIcon";
import { TagIcon } from "../icons/tagIcon";

export const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <span className="text-purple-600">
          <BrainIcon size="lg" />
        </span>
        <h1 className="text-xl font-bold text-gray-900">Second Brain</h1>
      </div>

      <nav className="flex flex-col gap-1 px-3 mt-2">
        <SidebarItem text="Tweets" icon={<TwitterIcon size="md" />} />
        <SidebarItem text="Videos" icon={<VideoIcon size="md" />} />
        <SidebarItem text="Documents" icon={<DocumentIcon size="md" />} />
        <SidebarItem text="Links" icon={<LinkIcon size="md" />} />
        <SidebarItem text="Tags" icon={<TagIcon size="md" />} />
      </nav>
    </div>
  );
};
