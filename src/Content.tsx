import { Box, TextField } from "@mui/material";
import { CONTENT_MARGIN, MIN_TEXTFIELD_HEIGHT, TITLE_MARGIN } from "./Values";
import type React from "react";
import type { SetStateAction } from "react";

export interface Props {
  text: String;
  setText: React.Dispatch<SetStateAction<String>>;
}

export default function Content({ text, setText }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={TITLE_MARGIN}
      sx={{ width: "100%" }}
    >
      {/* The main textfield for entering the paragraph */}
      <TextField
        id="main-textfield"
        label="Text"
        placeholder="Enter or paste your paragraph here..."
        variant="outlined"
        multiline={true}
        value={text}
        onChange={(text) => setText(text.target.value)}
        slotProps={{
          input: {
            sx: {
              "& textarea": {
                minHeight: MIN_TEXTFIELD_HEIGHT, // set the min height for the textfield by changing the textarea
              },
            },
          },
        }}
      />

      {/* The fields for setting the start wpm, end wpm and time */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="start"
        gap={CONTENT_MARGIN}
      >
        <TextField
          id="from-textfield"
          label="From WPM"
          variant="outlined"
          type="number"
          multiline={false}
        />

        <TextField
          id="to-textfield"
          label="To WPM"
          variant="outlined"
          type="number"
          multiline={false}
        />

        <TextField
          id="duration-textfield"
          label="Duration"
          variant="outlined"
          type="number"
          multiline={false}
        />
      </Box>
    </Box>
  );
}
