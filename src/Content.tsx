import { TextField } from "@mui/material";

export interface Props {
  text: String;
}

export default function Content({ text }: Props) {
  return (
    // The main text field for copy pasting the paragraph
    <TextField
      id="main-textfield"
      label="Text"
      variant="outlined"
      multiline={true}
      value={text}
      sx={{ width: "100%" }}
    />
  );
}
