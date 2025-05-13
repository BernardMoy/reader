import { TextField } from "@mui/material";

export interface Props {
  text: String;
}

export default function Content({ text }: Props) {
  return (
    <TextField
      id="main-textfield"
      label="Text"
      variant="outlined"
      value={text}
      sx={{}}
    />
  );
}
