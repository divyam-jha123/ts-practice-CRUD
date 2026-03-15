import { ShareIcon } from "../icons/shareIcon";
import { DeleteIcon } from "../icons/deleteIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { VideoIcon } from "../icons/videoIcon";
import { useEffect } from "react";

type CardType = "document" | "tweet" | "video"
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
};

export const Card = (props: CardProps) => {
  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [props.content, props.type]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow max-w-sm flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">{typeIcons[props.type]}</span>
          <h3 className="text-base font-semibold text-gray-900">
            {props.title}
          </h3>
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

      {props.type === "video" && <iframe
        className="w-full"
        src={props.content?.replace("watch?v=" , "embed/")}
        title={props.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>}


      {props.type === "tweet" && props.content && (
        <blockquote className="twitter-tweet">
          <a href={props.content.replace("x.com", "twitter.com")}></a>
        </blockquote>
      )}
      {/* Date */}
      <p className="text-xs text-gray-400">Added on {props.addedDate}</p>
    </div>
  );
};
