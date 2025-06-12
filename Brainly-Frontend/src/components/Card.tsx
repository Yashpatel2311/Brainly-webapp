<<<<<<< HEAD
import { ShareIcon } from "../Icons/ShareIcon";
import { useState } from "react";
import { TrashIcon } from "../Icons/TrashIcon";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  isInteractive?: boolean;
  onDelete?: (id: string) => void;
}

export function Card({
  _id,
  type,
  link,
  title,
  isInteractive = false,
  onDelete,
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContentClick = () => {
    if (isInteractive) {
      window.open(link, "_blank");
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(_id);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b from-purple-600 to-gray-300 text-black rounded-lg shadow-md min-h-48 min-w-56 group relative">
=======
// // import { ShareIcon } from "../Icons/ShareIcon";

// // interface Cardprops {
// //   title: string;
// //   link: string;
// //   type: "twitter" | "youtube";
// // }

// // export function Card({ type, link, title }: Cardprops) {
// //   return (
// //     <div className="p-4 bg-gradient-to-b from-purple-600 to-gray-300 text-black rounded-lg shadow-md min-h-48 min-w-72">
// //       <div className="flex justify-between items-center text-lg font-medium">
// //         <div className="flex items-center text-white">
// //           <div className="pr-2">
// //             <ShareIcon />
// //           </div>
// //           {title}
// //         </div>
// //         <div className="flex items-center justify-center space-x-2">
// //           <a
// //             href={link}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="text-gray-700 hover:text-purple-500"
// //           >
// //             <ShareIcon />
// //           </a>
// //         </div>
// //       </div>

// //       <div className="pt-2">
// //         {type === "youtube" && (
// //           <iframe
// //             className="w-full rounded-lg"
// //             src={link.replace("watch", "embed").replace("?v=", "/")}
// //             title="YouTube video player"
// //             frameBorder="0"
// //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //             referrerPolicy="strict-origin-when-cross-origin"
// //             allowFullScreen
// //           ></iframe>
// //         )}
// //         {type === "twitter" && (
// //           <blockquote className="twitter-tweet">
// //             <a href={link.replace("x.com", "twitter.com")}></a>
// //           </blockquote>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import { ShareIcon } from "../Icons/ShareIcon";

// interface Cardprops {
//   title: string;
//   link: string;
//   type: "twitter" | "youtube";
// }

// export function Card({ type, link, title }: Cardprops) {
//   return (
//     <div className="p-4 bg-gradient-to-b from-purple-600 to-gray-300 text-black rounded-lg shadow-md h-auto max-w-fit">
//       <div className="flex justify-between items-center text-lg font-medium">
//         <div className="flex items-center text-white">
//           <div className="pr-2">
//             <ShareIcon />
//           </div>
//           {title}
//         </div>
//         <div className="flex items-center justify-center space-x-2">
//           <a
//             href={link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-700 hover:text-purple-500"
//           >
//             <ShareIcon />
//           </a>
//         </div>
//       </div>

//       <div className="pt-2 flex justify-center">
//         {type === "youtube" && (
//           <iframe
//             className="w-full aspect-video rounded-lg"
//             src={link.replace("watch", "embed").replace("?v=", "/")}
//             title="YouTube video player"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         )}
//         {type === "twitter" && (
//           <iframe
//             className="w-full aspect-video rounded-lg"
//             src={`https://platform.twitter.com/embed/Tweet.html?dnt=false&id=${extractTweetId(
//               link
//             )}`}
//             title="Embedded Tweet"
//             frameBorder="0"
//             scrolling="no"
//             loading="lazy"
//           ></iframe>
//         )}
//       </div>
//     </div>
//   );
// }

// // Function to extract Tweet ID from the URL
// function extractTweetId(url: string): string {
//   const match = url.match(/status\/(\d+)/);
//   return match ? match[1] : "";
// }
import { ShareIcon } from "../Icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ type, link, title }: CardProps) {
  return (
    <div className="p-4 bg-gradient-to-b from-purple-600 to-gray-300 text-black rounded-lg shadow-md min-h-48 min-w-56">
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
      <div className="flex justify-between items-center text-lg font-medium">
        <div className="flex items-center text-white">
          <div className="pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center justify-center space-x-2">
<<<<<<< HEAD
          {isInteractive && onDelete && (
            <button
              type="button"
              className="text-gray-700 hover:text-red-500 cursor-pointer transition-colors duration-300"
              onClick={handleDelete}
              aria-label="Delete content"
            >
              <TrashIcon />
            </button>
          )}
          {type === "twitter" && (
            <button
              type="button"
              className="text-gray-700 cursor-pointer expand-button hover:scale-110 transition-transform duration-300"
              style={{ background: "none", border: "none" }}
              onClick={handleExpandClick}
              aria-label={isExpanded ? "Collapse tweet" : "Expand tweet"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          )}
=======
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-purple-500"
          >
            <ShareIcon />
          </a>
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        {type === "youtube" && (
<<<<<<< HEAD
          <div
            className={`w-full ${isInteractive ? "cursor-pointer" : ""}`}
            onClick={handleContentClick}
          >
            <iframe
              className="w-full aspect-video rounded-lg"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ pointerEvents: "none" }}
            ></iframe>
          </div>
        )}
        {type === "twitter" && (
          <div
            className={`relative w-full ${isInteractive ? "cursor-pointer" : ""}`}
            onClick={handleContentClick}
          >
            <iframe
              className={`w-full rounded-lg overflow-hidden transition-all duration-300 ${
                isExpanded ? "h-[500px]" : "h-40"
              }`}
              src={`https://platform.twitter.com/embed/Tweet.html?dnt=false&id=${extractTweetId(
                link
              )}`}
              title="Embedded Tweet"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              style={{ pointerEvents: "none" }}
            ></iframe>
          </div>
=======
          <iframe
            className="w-full aspect-video rounded-lg"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {type === "twitter" && (
          <iframe
            className="w-full h-40 rounded-lg overflow-hidden"
            src={`https://platform.twitter.com/embed/Tweet.html?dnt=false&id=${extractTweetId(
              link
            )}`}
            title="Embedded Tweet"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          ></iframe>
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
        )}
      </div>
    </div>
  );
}

// Function to extract Tweet ID from URL
function extractTweetId(url: string): string {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : "";
}
