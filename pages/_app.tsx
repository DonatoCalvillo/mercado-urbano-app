import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "context";
import type { AppProps } from "next/app";
import { lightTheme } from "../themes/light-theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
