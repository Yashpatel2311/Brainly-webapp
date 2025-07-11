import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "../components/Card";

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (!username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (username.length < 3) {
      errors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signup(username, email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#7766C6", padding: 0 }}
    >
      <div
        className="w-full flex items-center justify-center relative"
        style={{
          border: "2px dashed #f3f4f6", // lighter gray border
          margin: "5px",
          padding: "20px",
          boxSizing: "border-box",
          width: "calc(100vw - 10px)",
          height: "calc(100vh - 10px)",
          position: "relative",
          pointerEvents: "none", // allow clicks through border
          zIndex: 1,
        }}
      >
        {/* Floating Cards on Border */}
        <div
          className="absolute -top-10 -left-10 rotate-[-12deg] z-10 transition-transform duration-300 hover:rotate-[-6deg]"
          style={{ pointerEvents: "auto" }}
        >
          <Card
            type="twitter"
            title="Naval"
            link="https://twitter.com/naval/status/1002103360646823936"
            isInteractive={false}
            _id={""}
          />
        </div>
        <div
          className="absolute -top-10 -right-10 rotate-[10deg] z-10 transition-transform duration-300 hover:rotate-[6deg]"
          style={{ pointerEvents: "auto" }}
        >
          <Card
            type="youtube"
            title="Steve Jobs' 2005 Stanford Speech"
            link="https://www.youtube.com/watch?v=UF8uR6Z6KLc"
            isInteractive={false}
            _id={""}
          />
        </div>
        <div
          className="absolute -bottom-10 -left-6 rotate-[8deg] z-10 transition-transform duration-300 hover:rotate-[2deg]"
          style={{ pointerEvents: "auto" }}
        >
          <Card
            type="twitter"
            title="Jack Dorsey"
            link="https://twitter.com/jack/status/20"
            isInteractive={false}
            _id={""}
          />
        </div>
        {/* Main Signup Card */}
        <div
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-20"
          style={{ pointerEvents: "auto" }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Create an Account
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              error={validationErrors.username}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={validationErrors.email}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              error={validationErrors.password}
            />
            <Input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={validationErrors.confirmPassword}
            />

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                text={loading ? "Creating Account..." : "Sign Up"}
                fullWidth={true}
              />
            </div>
          </form>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
