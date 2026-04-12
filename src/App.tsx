import { BrowserRouter } from "react-router";
import AppRouter from "./modules/core/routes/Router";
import { AuthProvider } from "./modules/core/context/AuthContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
