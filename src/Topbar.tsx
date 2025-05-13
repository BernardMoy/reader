import { Box, Typography } from "@mui/material";
import { TITLE_MARGIN } from "./Values";

export default function Topbar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        gap: TITLE_MARGIN,
      }}
    >
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        Speed reader
      </Typography>
    </Box>
  );
}
