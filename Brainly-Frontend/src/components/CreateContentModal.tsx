import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

// You can replace this with any SVG or image you like
function ContentIllustration() {
  return (
    <div className="flex justify-center mb-4">
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="bg-purple-100 rounded-full p-2 shadow-md"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    </div>
  );
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();

    // Validate inputs
    if (!title || !link) {
      setError("Please fill in all fields");
      return;
    }

    // Validate link format based on type
    if (
      type === ContentType.Youtube &&
      !link.includes("youtube.com/watch?v=")
    ) {
      setError("Please enter a valid YouTube video URL");
      return;
    }
    if (
      type === ContentType.Twitter &&
      !link.includes("twitter.com/") &&
      !link.includes("x.com/")
    ) {
      setError("Please enter a valid Twitter/X post URL");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      onClose();
    } catch (error: any) {
      console.error("Error adding content:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add content. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center">
              <span className="bg-white opacity-100 p-8 rounded-2xl shadow-2xl min-w-[340px] max-w-full relative">
                <div
                  className="flex justify-end absolute right-4 top-4 cursor-pointer"
                  onClick={onClose}
                >
                  <CrossIcon />
                </div>
                <ContentIllustration />
                <h2 className="text-2xl font-bold text-center mb-4 text-purple-700">
                  Add New Content
                </h2>
                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                  >
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                <div className="w-full flex flex-col gap-2 mb-2">
                  <Input reference={titleRef} placeholder="Title" />
                  <Input reference={linkRef} placeholder="Link" />
                </div>
                <div>
                  <h1 className="text-center text-lg mb-2">Type</h1>
                  <div className="flex gap-2 justify-center pb-2">
                    <Button
                      text="Youtube"
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Youtube)}
                    />
                    <Button
                      text="Twitter"
                      variant={
                        type === ContentType.Twitter ? "primary" : "secondary"
                      }
                      onClick={() => setType(ContentType.Twitter)}
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text={isSubmitting ? "Adding..." : "Submit"}
                    fullWidth={true}
                    disabled={isSubmitting}
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
