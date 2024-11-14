// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TrialLoginPage from "./pages/LoginTrial";
import FullCard from "./components/FullCard";
import "./index.css";
import "@mantine/dates/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard/TaskCard" element={<FullCard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Trial" element={<TrialLoginPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
