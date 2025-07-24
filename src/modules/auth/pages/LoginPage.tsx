import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import type { LoginForm } from "@/types/authTypes";
import { loginUser } from "@/services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

   const navigate = useNavigate()

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await loginUser(data);
      toast.success(result.message);
      setTimeout(() => navigate("/todo"), 1000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center align-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register("username", {
                  required: "Username required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 character",
                  },
                })}
                className={`mt-2 block w-full rounded-md border px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-600 ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 character",
                    },
                  })}
                  className={`block w-full rounded-md border px-3 py-1.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-600 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
