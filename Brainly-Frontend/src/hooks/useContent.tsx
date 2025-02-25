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
