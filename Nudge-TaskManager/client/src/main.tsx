// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import '@mantine/dates/styles.css';
import Registration from "./pages/Registration";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/Registration" element={<Registration />}></Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
