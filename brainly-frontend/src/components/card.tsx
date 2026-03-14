import { ShareIcon } from "../icons/shareIcon";
import { DeleteIcon } from "../icons/deleteIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { VideoIcon } from "../icons/videoIcon";
import { LinkIcon } from "../icons/linkIcon";

type CardType = "document" | "tweet" | "video" | "link";

interface CardProps {
  title: string;
  type: CardType;
  content?: string;
  contentList?: string[];
  tags: string[];
  addedDate: string;
}

const typeIcons: Record<CardType, React.ReactElement> = {
  document: <DocumentIcon size="sm" />,
  tweet: <TwitterIcon size="sm" />,
  video: <VideoIcon size="sm" />,
  link: <LinkIcon size="sm" />,
};

export const Card = (props: CardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow max-w-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{typeIcons[props.type]}</span>
          <h3 className="text-base font-semibold text-gray-900">{props.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
            <ShareIcon size="sm" />
          </button>
          <button className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
            <DeleteIcon size="sm" />
          </button>
        </div>
      </div>

      {/* Content */}
      {props.content && (
        <p className="text-sm text-gray-600 leading-relaxed">{props.content}</p>
      )}

      {props.contentList && (
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-2">{props.title === "Project Ideas" ? "Future Projects" : ""}</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {props.contentList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Image placeholder for video/link type */}
      {props.type === "video" && !props.content && !props.contentList && (
        <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-10 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        </div>
      )}

      {/* Tags */}
      {props.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {props.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-gray-400">Added on {props.addedDate}</p>
    </div>
  );
};
