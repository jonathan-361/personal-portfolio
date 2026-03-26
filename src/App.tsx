import { BrowserRouter } from "react-router";
import AppRouter from "./modules/core/routes/Router";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
