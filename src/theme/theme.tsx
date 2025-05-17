import { createTheme } from "@mui/material/styles";
import "@fontsource/open-sans";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1893d6",
    },
    secondary: {
      main: "#81dbd8",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
});

export default theme;
