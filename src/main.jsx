import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/Auth.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-day-picker/dist/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeProvider } from "./context/Theme.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}
        <AuthProvider>
          <App />
          <ToastContainer position="top-right" rtl />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
