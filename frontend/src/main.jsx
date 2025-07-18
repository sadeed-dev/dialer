import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from './components/style/theme'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'; 
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./pages/auth/authConfig";



const msalInstance = new PublicClientApplication(msalConfig);

const queryClient = new QueryClient();

console.timeLog(msalInstance)
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>   
           </ThemeProvider>
    </QueryClientProvider>
  </>
);
