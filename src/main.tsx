import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import theme from "./configs/theme.ts";
import { ThemeProvider } from "@mui/material/styles";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  </Provider>
  // </StrictMode>
);
