import { Box, TextField, Typography } from "@mui/material";
import { CONTENT_MARGIN, PAGE_MARGIN, TITLE_MARGIN } from "./Values";
import Topbar from "./Topbar";
import Content from "./Content";
import { useState } from "react";

export default function Home() {
  // the text entered into the paragraph
  const [mainText, setMainText] = useState<String>("");

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        px: PAGE_MARGIN, // margin around the full webpage
        py: TITLE_MARGIN,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: TITLE_MARGIN, // vertical margin between elements
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
        {Content({ text: mainText, setText: setMainText })}
      </Box>
    </Box>
  );
}
