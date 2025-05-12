import { Box, TextField, Typography } from "@mui/material";
import { CONTENT_MARGIN, TITLE_MARGIN } from "./Values";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          gap: CONTENT_MARGIN,
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Speed reader
        </Typography>
      </Box>
    </Box>
  );
}
