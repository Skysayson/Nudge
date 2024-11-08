// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import '@mantine/dates/styles.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/LoginPage" element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
