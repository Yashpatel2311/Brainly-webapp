// import { useRef } from "react";
// import { Button } from "../components/Button";
// import { Input } from "../components/Input";
// import { BACKEND_URL } from "../config";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export function Signin() {
//   const usernameref = useRef<HTMLInputElement>(null);
//   const passwordref = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();
//   async function signin() {
//     try {
//       const username = usernameref.current?.value;
//       const password = passwordref.current?.value;

//       const res = await axios.post(BACKEND_URL + "/api/v1/signin", {
//         username,
//         password,
//       });

//       const jwt = res.data.token;
//       localStorage.setItem("token", jwt);
//       navigate("/dashboard");
//       //redirect the user to the dashboard
//     } catch (error: any) {
//       console.error("Signin Error:", error);
//       alert("Signin failed: " + error.message);
//     }
//   }

//   return (
//     <div className="h-screen w-screen bg-purple-600 flex justify-center items-center">
//       <div className="bg-white rounded-xl border border-gray-300 min-w-48 p-8 shadow-lg">
//         <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
//           Sign In
//         </h2>

//         {/* Username Input */}
//         <Input reference={usernameref} placeholder="Username" />

//         {/* Password Input */}
//         <Input reference={passwordref} placeholder="Password" />

//         <div className="flex justify-center pt-4">
//           <Button
//             onClick={signin}
//             variant="primary"
//             text="Signin"
//             fullWidth={true}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin(event: React.FormEvent) {
    event.preventDefault(); // Prevent the form from causing a page reload

    try {
      const username = usernameref.current?.value;
      const password = passwordref.current?.value;

      const res = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username,
        password,
      });

      const jwt = res.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Signin Error:", error);
      alert("Signin failed: " + error.message);
    }
  }

  return (
    <div className="h-screen w-screen bg-purple-600 flex justify-center items-center">
      <div className="bg-white rounded-xl border border-gray-300 min-w-48 p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Sign In
        </h2>

        {/* ✅ Wrap inputs in a form and call signin on submit */}
        <form onSubmit={signin}>
          {/* Username Input */}
          <Input reference={usernameref} placeholder="Username" />

          {/* Password Input */}
          <Input reference={passwordref} placeholder="Password" />

          <div className="flex justify-center pt-4">
            <Button variant="primary" text="Signin" fullWidth={true} />
          </div>
        </form>
      </div>
    </div>
  );
}
