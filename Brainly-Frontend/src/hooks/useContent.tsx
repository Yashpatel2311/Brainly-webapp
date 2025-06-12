<<<<<<< HEAD
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setContents(response.data.content);
    } catch (error: any) {
      console.error("Error fetching content:", error);
      setError(error.response?.data?.message || "Failed to fetch content");
      setContents([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteContent(_id: string) {
    try {
      setError(null);
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { _id },
      });

      if (response.data.success) {
        // Update local state immediately for better UX
        setContents((prevContents) =>
          prevContents.filter((content) => content._id !== _id)
        );
      } else {
        throw new Error(response.data.message || "Failed to delete content");
      }
    } catch (error: any) {
      console.error("Error deleting content:", error);
      setError(error.response?.data?.message || "Failed to delete content");
      throw error;
    }
  }

  // Only fetch content once when the component mounts
  useEffect(() => {
    refresh();
  }, []); // Empty dependency array means this only runs once on mount

  return { contents, refresh, deleteContent, error, loading };
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
=======
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContents] = useState([]);
  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      });
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
  return { contents, refresh };
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
>>>>>>> fa11b1cc25f48465ee748947c0713874aae21b57
