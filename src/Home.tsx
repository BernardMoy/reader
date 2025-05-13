import { Box, TextField, Typography } from "@mui/material";
import { CONTENT_MARGIN, TITLE_MARGIN } from "./Values";
import Topbar from "./Topbar";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: TITLE_MARGIN,
      }}
    >
      {/* The top bar */}
      {Topbar()}
    </Box>
  );
}
