import { Box, TextField, Typography } from "@mui/material";
import { CONTENT_MARGIN, MIN_TEXTFIELD_HEIGHT, TITLE_MARGIN } from "./Values";
import type React from "react";
import { useState, type SetStateAction } from "react";
import CustomButton from "./CustomButton";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import split from "./Split";

// function to delay execution in ms
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// async function to sequentially set the current word with delays to achieve displaying words one by one
async function play(
  wordList: String[],
  initialWpm: number,
  finalWpm: number,
  duration: number,
  setCurrentWord: React.Dispatch<React.SetStateAction<String | null>>
) {
  // the initial duration where a single word is displayed is (60/n)*1000 (ms)
  for (const w of wordList) {
    setCurrentWord(w);
    await sleep(60000 / initialWpm);
  }

  // when all words have been displayed, set the current word back to null to exit play mode
  setCurrentWord(null);
}

export interface Props {
  text: String;
  setText: React.Dispatch<SetStateAction<String>>;
}

export default function Content({ text, setText }: Props) {
  // store the initial wpm, final wpm and also the duration
  const [initialWpm, setInitialWpm] = useState<number>(200);
  const [finalWpm, setFinalWpm] = useState<number>(200);
  const [duration, setDuration] = useState<number>(10);

  // store the current word to be displayed, or none if there aren't any
  // if current word is none, then it is not in a displaying state
  const [currentWord, setCurrentWord] = useState<String | null>(null);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={TITLE_MARGIN}
      sx={{ width: "100%" }}
    >
      {/* The main textfield for entering the paragraph */}
      {currentWord === null && (
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
      )}

      {/* The box for displaying large text */}
      {currentWord !== null && (
        <Typography
          variant="h1"
          align="center"
          minHeight={MIN_TEXTFIELD_HEIGHT}
        >
          {currentWord}
        </Typography>
      )}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="start"
        gap={CONTENT_MARGIN}
      >
        {/* The fields for setting the start wpm, end wpm and time */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="start"
          flexGrow="1"
          gap={CONTENT_MARGIN}
        >
          <TextField
            id="from-textfield"
            label="From WPM"
            variant="outlined"
            type="number"
            multiline={false}
            value={initialWpm}
            onChange={(n) => setInitialWpm(Number(n.target.value))}
          />

          <TextField
            id="to-textfield"
            label="To WPM"
            variant="outlined"
            type="number"
            multiline={false}
            value={finalWpm}
            onChange={(n) => setFinalWpm(Number(n.target.value))}
          />

          <TextField
            id="duration-textfield"
            label="Duration (s)"
            variant="outlined"
            type="number"
            multiline={false}
            value={duration}
            onChange={(n) => setDuration(Number(n.target.value))} // cast to number
          />
        </Box>

        {/* Start button with icon */}
        {currentWord === null && (
          <CustomButton
            text="Start"
            color="primary"
            startIcon={<PlayCircleFilledWhiteIcon />}
            variant="contained"
            onClick={async () => {
              // split the text into word list using the split function
              const wordList = split(text);

              // call the play function to display the words
              await play(
                wordList,
                initialWpm,
                finalWpm,
                duration,
                setCurrentWord
              );
            }}
          />
        )}

        {/* Stop button with icon */}
        {currentWord !== null && (
          <CustomButton
            text="Stop"
            color="secondary"
            startIcon={<StopCircleIcon />}
            variant="contained"
            onClick={() => {
              setCurrentWord(null);
            }}
          />
        )}
      </Box>
    </Box>
  );
}
