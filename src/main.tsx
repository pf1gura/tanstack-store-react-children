import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppWithStore } from "./AppWithStore.tsx";
import { AppWithContext } from "./AppWithContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <AppWithStore />
      {/* <AppWithContext /> */}
    </>
  </StrictMode>,
);
