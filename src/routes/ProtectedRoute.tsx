import type { UserModel } from "@/types/authTypes";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isExist = users.find((u: UserModel) => u.username === user);
  const [unauthorized, setUnauthorized] = useState(false);

  const toastShown = useRef(false); // prevent double notif

  useEffect(() => {
    if ((!user || !isExist) && !toastShown.current) {
      toast.error("Oops! You don't have permission to access this page");
      toastShown.current = true;
      setUnauthorized(true);
    }
  }, [user, isExist]);

  if (unauthorized) return <Navigate to="/login" replace />;
  if (!user || !isExist) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
