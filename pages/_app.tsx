import { useState, useEffect } from "react";
import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme, customTheme } from "../themes";
import Cookies from "js-cookie";

interface Props extends AppProps {
  theme: string;
}
// INICIO
function MyApp({ Component, pageProps, theme = "dark" }: Props) {
  // STATE
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  // EFFECT
  useEffect(() => {
    const cookieTheme = Cookies.get("theme") || "ligth";
    const selectedTheme =
      cookieTheme === "ligth"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;
    setCurrentTheme(selectedTheme);
  }, []);

  // RENDER
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
// Si no es obligatorio no usar getInitialProps, al usarlo todas las paginas se renderinzan desde el servidor

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: "ligth" };
//   const validThemes = ["ligth", "dark", "custom"];
//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   };
// };

export default MyApp;
