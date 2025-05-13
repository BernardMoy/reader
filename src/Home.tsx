import { Box, TextField, Typography } from "@mui/material";
import { CONTENT_MARGIN, TITLE_MARGIN } from "./Values";
import Topbar from "./Topbar";
import Content from "./Content";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: TITLE_MARGIN,
        height: "100vh", // The outer box need to have the size of the screen to push elements using flex grow
        width: "100vw",
      }}
    >
      {/* The top bar */}
      {Topbar()}

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        {Content()}
      </Box>
    </Box>
  );
}
