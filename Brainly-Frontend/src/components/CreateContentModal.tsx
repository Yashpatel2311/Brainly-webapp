// import { useRef, useState } from "react";
// import { CrossIcon } from "../Icons/CrossIcon";
// import { Button } from "./Button";
// import { Input } from "./Input";
// import axios from "axios";
// import { BACKEND_URL } from "../config";

// enum contenttype {
//   Youtube = "youtube",
//   Twitter = "twitter",
// }
// //controlled component
// export function CreateContentModal({ open, onClose }) {
//   const titleref = useRef<HTMLInputElement>();
//   const linkref = useRef<HTMLInputElement>();
//   const [type, setType] = useState(contenttype.Youtube);
//   async function addcontent() {
//     const title = titleref.current?.value;
//     const link = linkref.current?.value;
//     await axios.post(
//       `${BACKEND_URL}/api/v1/content`,
//       {
//         link,
//         title,
//         type,
//       },
//       {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       }
//     );
//   }
//   return (
//     <div>
//       {open && (
//         <div>
//           (
//           <div className="opacity-60 w-screen h-screen bg-slate-500 fixed top-0 left-0 flex justify-center"></div>
//           <div className=" w-screen h-screen  fixed top-0 left-0 flex justify-center">
//             <div className="flex flex-col justify-center">
//               <span className="bg-neutral-100 opacity-100 p-4 rounded">
//                 <div className="flex justify-end">
//                   <div onClick={onClose}>
//                     <CrossIcon />
//                   </div>
//                 </div>
//                 <div>
//                   <Input reference={titleref} placeholder={"Title"} />
//                   <Input reference={linkref} placeholder={"Link"} />
//                 </div>
//                 <div>
//                   <h1>Type</h1>
//                   <div className="flex gap-1 p-4">
//                     <Button
//                       onClick={() => {
//                         setType(contenttype.Youtube);
//                       }}
//                       text="Youtube"
//                       variant={
//                         type === contenttype.Youtube ? "primary" : "secondary"
//                       }
//                     />
//                     <Button
//                       onClick={() => {
//                         setType(contenttype.Twitter);
//                       }}
//                       text="Twitter"
//                       variant={
//                         type === contenttype.Twitter ? "primary" : "secondary"
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-center">
//                   <Button
//                     onClick={addcontent}
//                     variant="primary"
//                     text="Submit"
//                   />
//                 </div>
//               </span>
//             </div>
//           </div>
//           )
//         </div>
//       )}
//     </div>
//   );
// }
import { useRef, useState } from "react"; // Importing React hooks for state management and refs
import { CrossIcon } from "../Icons/CrossIcon"; // Importing the close icon
import { Button } from "./Button"; // Importing the Button component
import { Input } from "./Input"; // Importing the Input component for form inputs
import { BACKEND_URL } from "../config"; // Importing the backend URL for API requests
import axios from "axios"; // Importing axios for HTTP requests

// Enum to represent different types of content
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

// Interface for the props passed to the CreateContentModal component
interface CreateContentModalProps {
  open: boolean; // State to determine if the modal is open
  onClose: () => void; // Function to close the modal
}

// CreateContentModal component definition
export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  // References to the input fields for title and link
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  // State to manage the selected content type
  const [type, setType] = useState(ContentType.Youtube);

  // Function to handle adding new content
  async function addContent() {
    const title = titleRef.current?.value; // Getting the title value from the input
    const link = linkRef.current?.value; // Getting the link value from the input

    // Making a POST request to add new content
    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token") || "", // Including the authorization token
        },
      }
    );

    // Closing the modal after adding content
    onClose();
  }

  return (
    <div>
      {open && (
        // Modal background overlay
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          {/* Modal content container */}
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 rounded fixed">
                {/* Close button */}
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                {/* Input fields for title and link */}
                <div>
                  <Input reference={titleRef} placeholder="Title" />
                  <Input reference={linkRef} placeholder="Link" />
                </div>
                {/* Content type selection */}
                <div>
                  <h1 className="text-center text-lg mb-2">Type</h1>
                  <div className="flex gap-1 justify-center pb-2">
                    {/* Button to select YouTube type */}
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Youtube)}
                    />
                    {/* Button to select Twitter type */}
                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Twitter)}
                    />
                  </div>
                </div>
                {/* Submit button */}
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                  />
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
