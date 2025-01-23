import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import theme from "./theme";
import Login from "./pages/user/Login";
import ResetPassword from "./pages/user/ResetPassword";
import "./locales/i18n";
import AuthLayout from "./pages/user/AuthLayout";
import SignUp from "./pages/user/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthGuard from "./router/authGuard";
import { SnackbarProvider } from "notistack";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} defaultMode="system">
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                index
                element={
                  <AuthGuard>
                    <Home />
                  </AuthGuard>
                }
              />
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
    ,
  </React.StrictMode>
);
