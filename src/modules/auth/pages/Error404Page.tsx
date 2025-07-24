import { Link } from "react-router-dom";

export default function Error404Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/login"
        className="rounded-xl bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 transition"
      >
        Back to Login
      </Link>
    </div>
  );
}
