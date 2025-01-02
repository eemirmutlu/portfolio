import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProviderComponent } from "./contexts/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <LanguageProviderComponent>
    <App />
  </LanguageProviderComponent>
);
