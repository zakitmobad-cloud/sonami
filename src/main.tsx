import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletContext } from "./contexts/WalletContext";

createRoot(document.getElementById("root")!).render(
  <WalletContext>
    <App />
  </WalletContext>
);
