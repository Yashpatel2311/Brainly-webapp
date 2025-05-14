import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

interface ValidationErrors {
  username?: string;
  password?: string;
}

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const { signin } = useAuth();
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

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
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
      const success = await signin(username, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      console.error("Signin error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-purple-600 flex justify-center items-center overflow-hidden">
      <div className="bg-white rounded-xl border border-gray-300 min-w-48 p-8 shadow-lg relative">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
            minLength={3}
            error={validationErrors.username}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            minLength={6}
            error={validationErrors.password}
          />

          <div className="flex justify-center pt-4">
            <div className="w-full">
              <Button
                type="submit"
                variant="primary"
                text={loading ? "Signing in..." : "Sign In"}
                fullWidth={true}
              />
            </div>
          </div>
        </form>

        <div className="mt-6 text-center text-black">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="hover:underline text-purple-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
