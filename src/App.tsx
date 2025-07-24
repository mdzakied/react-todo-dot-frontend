import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />
      <AppRouter />
    </div>
  );
}

export default App;
