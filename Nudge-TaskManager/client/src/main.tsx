// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import LoginPage from "./pages/LoginPage";
import BasePage from "./components/BasePage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/BasePage" element={<BasePage/>}/>
          <Route path="/LoginPage" element={<LoginPage />}/>
          {/* Fallback for 404 */}
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
