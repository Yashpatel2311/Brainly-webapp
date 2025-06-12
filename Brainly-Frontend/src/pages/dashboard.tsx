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
<<<<<<< HEAD
import { motion, AnimatePresence } from "framer-motion";

export function Dashboard() {
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { contents, refresh, deleteContent, error, loading } = useContent();
  const { signout } = useAuth();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, [ModalOpen]);

  const handleDeleteContent = async (_id: string) => {
    try {
      setDeleteError(null);
      await deleteContent(_id);
    } catch (error: any) {
      setDeleteError(error.message || "Failed to delete content");
      // Auto-hide error after 3 seconds
      setTimeout(() => setDeleteError(null), 3000);
    }
  };

  // Filter contents based on selected type
  const filteredContents = selectedType
    ? contents.filter((content) => content.type === selectedType)
    : contents;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonVariants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const mainContentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="flex">
      <motion.div variants={sidebarVariants} initial="hidden" animate="visible">
        <Sidebar selectedType={selectedType} onSelectType={setSelectedType} />
      </motion.div>

      <motion.div
        variants={mainContentVariants}
        initial="hidden"
        animate="visible"
        className="p-4 ml-72 min-h-screen bg-gray-100 border-2 flex-1"
      >
        {ModalOpen && (
          <CreateContentModal
            open={ModalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          />
        )}

        {/* Error Messages */}
        {(error || deleteError) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            {error || deleteError}
          </motion.div>
        )}

        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          className="flex justify-end gap-4 mb-3"
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={() => {
                setModalOpen(true);
              }}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/brain/share`,
                    { share: true },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={signout}
              variant="secondary"
              text="Sign Out"
              startIcon={<SignOutIcon />}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 flex-wrap"
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full text-center py-8 text-gray-500"
            >
              Loading content...
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredContents.length > 0 ? (
                filteredContents.map((content) => (
                  <motion.div
                    key={content._id}
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    className="transition-shadow duration-300 hover:shadow-lg"
                    layout
                  >
                    <Card
                      _id={content._id}
                      type={content.type as "twitter" | "youtube"}
                      link={content.link}
                      title={content.title}
                      isInteractive={true}
                      onDelete={handleDeleteContent}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="w-full text-center py-8 text-gray-500"
                >
                  {selectedType
                    ? `No ${selectedType} content available. Add some ${selectedType} content to get started!`
                    : "No content available. Add some content to get started!"}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
=======
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
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
}
