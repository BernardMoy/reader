import { TextField } from "@mui/material";
import { MIN_TEXTFIELD_HEIGHT } from "./Values";
import type React from "react";
import type { SetStateAction } from "react";

export interface Props {
  text: String;
  setText: React.Dispatch<SetStateAction<String>>;
}

export default function Content({ text, setText }: Props) {
  return (
    // The main text field for copy pasting the paragraph
    <TextField
      id="main-textfield"
      label="Text"
      variant="outlined"
      multiline={true}
      value={text}
      onChange={(text) => setText(text.target.value)}
      sx={{ width: "100%" }}
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
  );
}
