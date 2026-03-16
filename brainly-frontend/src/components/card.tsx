import { ShareIcon } from "../icons/shareIcon";
import { DeleteIcon } from "../icons/deleteIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { VideoIcon } from "../icons/videoIcon";
import { CrossIcon } from "../icons/crossicon";
import { useEffect, useState, useRef } from "react";

type CardType = "document" | "tweet" | "video";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [props.content, props.type, isExpanded]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    if (isExpanded) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  const renderMedia = () => (
    <>
      {props.type === "video" && (
        <iframe
          className="w-full rounded-lg aspect-video"
          src={props.content?.replace("watch?v=", "embed/")}
          title={props.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {props.type === "tweet" && props.content && (
        <blockquote className="twitter-tweet">
          <a href={props.content.replace("x.com", "twitter.com")}></a>
        </blockquote>
      )}

      {props.type === "document" && props.content && (
        <p className="text-sm text-gray-600 leading-relaxed">{props.content}</p>
      )}
    </>
  );

  return (
    <>
      {/* Preview Card */}
      <div
        ref={cardRef}
        onClick={() => setIsExpanded(true)}
        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 max-w-sm flex flex-col gap-3 cursor-pointer hover:-translate-y-0.5 h-[220px] overflow-hidden relative group"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-gray-500 shrink-0">{typeIcons[props.type]}</span>
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {props.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ShareIcon size="sm" />
            </button>
            <button
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <DeleteIcon size="sm" />
            </button>
          </div>
        </div>

        {/* Truncated Content */}
        <div className="flex-1 overflow-hidden relative">
          {renderMedia()}
          {/* Fade-out gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        {/* Date */}
        <p className="text-xs text-gray-400">Added on {props.addedDate}</p>

        {/* Hover hint */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-xl">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium text-gray-500 bg-white/90 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
            Click to expand
          </span>
        </div>
      </div>

      {/* Expanded Modal Overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsExpanded(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Expanded Card */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 flex flex-col gap-4 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer z-10"
            >
              <CrossIcon />
            </button>

            {/* Header */}
            <div className="flex items-start gap-2 pr-8">
              <span className="text-gray-500 mt-0.5 shrink-0">{typeIcons[props.type]}</span>
              <h3 className="text-lg font-bold text-gray-900">{props.title}</h3>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {props.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Full Content */}
            <div className="flex-1">{renderMedia()}</div>

            {/* Date */}
            <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
              Added on {props.addedDate}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
