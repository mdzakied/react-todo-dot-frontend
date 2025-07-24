import { Route } from "react-router-dom";
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";
import Error404Page from "@/modules/auth/pages/Error404Page";

const PublicRoutes = (
  <>
    <Route path="*" element={<Error404Page />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </>
);

export default PublicRoutes;
