import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string;
  link: string;
  type: string;
  title: string;
  userId: string;
  tags: string[];
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
        setContents([]);
      });
  }

  async function deleteContent(_id: string) {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { _id },
      });

      if (response.data.success) {
        // Only refresh if deletion was successful
        await refresh();
      } else {
        throw new Error(response.data.message || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      throw error;
    }
  }

  useEffect(() => {
    refresh();
    let interval = setInterval(() => {
      refresh();
    }, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh, deleteContent };
}

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../config";

// export function useContent() {
//   const [contents, setContents] = useState<any[]>([]); // Always an array

//   useEffect(() => {
//     axios
//       .get(`${BACKEND_URL}/api/v1/content`, {
//         headers: {
//           Authorization: localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         console.log("API Response:", response.data); // Debugging
//         setContents(Array.isArray(response.data) ? response.data : []);
//       })
//       .catch((error) => {
//         console.error("Error fetching content:", error);
//         setContents([]); // Ensure it's always an array
//       });
//   }, []);

//   return contents;
// }
