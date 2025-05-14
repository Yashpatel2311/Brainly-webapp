import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { SignOutIcon } from "../Icons/SignOutIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { BACKEND_URL } from "../config";
// import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [ModalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const { signout } = useAuth();
  console.log("Contents in ds:", contents);
  useEffect(() => {
    refresh();
  }, [ModalOpen]);
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <CreateContentModal
          open={ModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4 mb-3">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          ></Button>
          {/* <Button
            onClick={async () => {
              const response = axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
            }}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          ></Button> */}
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                console.log("Share URL:", shareUrl);
                alert(shareUrl);
              } catch (error) {
                console.error("Error sharing brain:", error);
              }
            }}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
          <Button
            onClick={signout}
            variant="secondary"
            text="Sign Out"
            startIcon={<SignOutIcon />}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
  // console.log("Contents in Dashboard:", contents);
  // return (
  //   <div>
  //     <Sidebar />
  //     <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
  //       <CreateContentModal
  //         open={ModalOpen}
  //         onClose={() => setModalOpen(false)}
  //       />
  //       <div className="flex justify-end gap-4">
  //         <Button
  //           onClick={() => setModalOpen(true)}
  //           variant="primary"
  //           text="Add Content"
  //           startIcon={<PlusIcon />}
  //         />
  //         <Button
  //           variant="secondary"
  //           text="Share Brain"
  //           startIcon={<ShareIcon />}
  //         />
  //       </div>
  //       <div className="flex gap-4 flex-wrap">
  //         {Array.isArray(contents) && contents.length > 0 ? (
  //           contents.map(({ _id, type, link, title }, index) => {
  //             console.log("Rendering Item:", { _id, type, link, title });
  //             return (
  //               <Card
  //                 key={_id || index}
  //                 type={type}
  //                 link={link}
  //                 title={title}
  //               />
  //             );
  //           })
  //         ) : (
  //           <p className="text-gray-500">No content available.</p>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}
