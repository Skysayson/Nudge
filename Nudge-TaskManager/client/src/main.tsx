// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import LoginPage from "./pages/LoginPage";
import BasePage from "./pages/BasePage";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import '@mantine/dates/styles.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/DashboardPage" element={<DashboardPage/>}></Route>
          <Route path="/BasePage" element={<BasePage/>}/>
          <Route path="/LoginPage" element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
