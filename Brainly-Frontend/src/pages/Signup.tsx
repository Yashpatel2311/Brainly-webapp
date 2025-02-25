import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameref = useRef<HTMLInputElement>();
  const passwordref = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  async function signup() {
    try {
      const username = usernameref.current?.value;
      const password = passwordref.current?.value;

      const res = await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });

      console.log(res); // Log response
      navigate("/signin");
      alert("You have signed up!");
    } catch (error: any) {
      console.error("Signup Error:", error);
      alert("Signup failed: " + error.message);
    }
  }
  return (
    <div className="h-screen w-screen bg-purple-600 flex justify-center items-center">
      <div className="bg-white rounded-xl border border-gray-300 min-w-48 p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        {/* Username Input */}
        <Input reference={usernameref} placeholder="Username" />

        {/* Password Input */}
        <Input reference={passwordref} placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button
            onClick={signup}
            variant="primary"
            text="Signup"
            fullWidth={true}
          />
        </div>
        <div className="mt-6 text-center text-black">
          <p>
            Already have an account?
            <a href="/signin" className="hover:underline text-purple-600">
              {" "}
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
