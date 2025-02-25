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
      <div className="flex justify-between items-center text-lg font-medium">
        <div className="flex items-center text-white">
          <div className="pr-2">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center justify-center space-x-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-purple-500"
          >
            <ShareIcon />
          </a>
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        {type === "youtube" && (
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
