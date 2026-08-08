import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, ROUTES } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, data);

      // Success
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        Swal.fire({
          title: "Login Successful",
          text: response.data?.message || "Welcome back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(ROUTES.DASHBOARD, { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);

      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";

      if (status === 400) {
        Swal.fire({
          title: "Invalid Request",
          text: message,
          icon: "warning",
        });
      } else if (status === 401) {
        Swal.fire({
          title: "Login Failed",
          text: message,
          icon: "error",
        });
      } else if (status === 404) {
        Swal.fire({
          title: "Not Found",
          text: message,
          icon: "error",
        });
      } else if (status === 500) {
        Swal.fire({
          title: "Server Error",
          text: "Something went wrong on the server.",
          icon: "error",
        });
      } else if (!error.response) {
        Swal.fire({
          title: "Connection Error",
          text: "Unable to connect to the server.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-900 px-4">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-100">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-400">
          Sign in to your admin account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-white/10 bg-surface-200/50 px-3 py-2 text-gray-100 outline-none focus:border-accent"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-white/10 bg-surface-200/50 px-3 py-2 text-gray-100 outline-none focus:border-accent"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-accent px-4 py-2 font-medium text-white transition hover:bg-accent-dark disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
