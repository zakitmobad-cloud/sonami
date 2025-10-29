import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WalletContext } from "./contexts/WalletContext";
import posthog from "posthog-js";

// ✅ Initialize PostHog only in the browser
if (typeof window !== "undefined") {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    autocapture: true, // automatically track clicks & pageviews
  });
}

createRoot(document.getElementById("root")!).render(
  <WalletContext>
    <App />
  </WalletContext>
);
