import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Home";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { TITLE_MARGIN } from "./Values";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
