import { Navigate, Route } from "react-router-dom";
import TodoPage from "@/modules/todo/pages/TodoPage";
import ProtectedRoute from "./ProtectedRoute";

const PrivateRoutes = (
  <>
    {/* Redirect default route */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route
      path="/todo"
      element={
        <ProtectedRoute>
          <TodoPage />
        </ProtectedRoute>
      }
    />
  </>
);

export default PrivateRoutes;
