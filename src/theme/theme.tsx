import { createTheme } from "@mui/material/styles";
import "@fontsource/open-sans";
import "@fontsource/open-sans/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1893d6",
    },
    secondary: {
      main: "#fc6b03",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
});

export default theme;
