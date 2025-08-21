// app/auth/reset-password/page.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/auth/verify-reset-token?token=${token}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Invalid or expired token");
        }

        setValidToken(true);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token) verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!validToken && error) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center w-full h-screen">
        <div className="bg-white w-[350px] px-6 py-8 rounded-xl shadow-lg animate-fade-in">
          <div className="w-full flex flex-col items-center mb-4">
            <IoPersonCircleOutline className="text-5xl text-blue-500 mb-2" />
            <h2 className="text-3xl text-blue-600 font-bold">Reset Password</h2>
          </div>
          <p className="text-red-500 text-sm mt-2">{error}</p>
          <div className="text-xs mt-5 flex justify-center">
            <Link href="/login" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center w-full h-screen">
      <div className="bg-white w-[350px] px-6 py-8 rounded-xl shadow-lg animate-fade-in">
        <div className="w-full flex flex-col items-center mb-4">
          <IoPersonCircleOutline className="text-5xl text-blue-500 mb-2" />
          <h2 className="text-3xl text-blue-600 font-bold">Reset Password</h2>
          <p className="text-sm text-gray-400">Enter your new password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full text-sm py-2 px-3 bg-blue-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md outline-none transition"
              type="password"
              placeholder="New password"
              required
              minLength={6}
            />
          </div>
          <div className="mt-4">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="w-full text-sm py-2 px-3 bg-blue-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md outline-none transition"
              type="password"
              placeholder="Confirm new password"
              required
              minLength={6}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white text-sm font-medium px-4 py-2 rounded-md transition duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Resetting...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default page;