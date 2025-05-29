import { Box, TextField, Typography } from "@mui/material";
import { CONTENT_MARGIN, MIN_TEXTFIELD_HEIGHT, TITLE_MARGIN } from "./Values";
import type React from "react";
import { useEffect, useRef, useState, type SetStateAction } from "react";
import CustomButton from "./CustomButton";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import split from "./split";

// async function to sequentially set the current word with delays to achieve displaying words one by one
async function play(
  wordList: String[],
  initialWpm: number,
  finalWpm: number,
  duration: number,
  currentWordNumber: number,
  setCurrentWordNumber: React.Dispatch<React.SetStateAction<number>>,
  setTotalWordNumber: React.Dispatch<React.SetStateAction<number>>,
  setCurrentWord: React.Dispatch<React.SetStateAction<String | null>>,
  playing: React.RefObject<Boolean> // UseRef hook -> React useStates are not updated immediately
) {
  //the index of the word being displayed
  let index = 0;
  setCurrentWordNumber(index);

  // set the total word number
  setTotalWordNumber(wordList.length);

  // the initial duration where a single word is displayed is (60/n)*1000 (ms)
  // stop when playing.current is set to false
  const interval = 60000 / initialWpm;

  setInterval(() => {
    // display the next word
    setCurrentWordNumber(currentWordNumber + 1);
    setCurrentWord(wordList[currentWordNumber]);
  }, interval);

  // when all words have been displayed, set the current word back to null to exit play mode
  setTotalWordNumber(0);
  setCurrentWordNumber(0);
  setCurrentWord(null);

  // exit play state
  playing.current = false;
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

  // store the current word number to be displayed, or none if there aren't any
  // if current word is none, then it is not in a displaying state
  const [currentWordNumber, setCurrentWordNumber] = useState<number>(0);
  const [totalWordNumber, setTotalWordNumber] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<String | null>(null);

  // state to check if it is playing
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) {
      return;
    }

    // split the paragraph
    const wordList = split(text);

    // set current word to be the first word initially
    setCurrentWord(wordList[0]);

    // set the total word number
    setTotalWordNumber(wordList.length);

    var id = setInterval(() => {
      // update the word number
      setCurrentWordNumber((prev) => {
        const next = prev + 1;

        setCurrentWord(wordList[next]); // updates the word immediately - this cannot be placed outside: Updates are asynchronous
        return next;
      });
    }, 1000);

    return () => {
      setCurrentWordNumber(0); // set current and total word number to 0
      setTotalWordNumber(0);
      setCurrentWord(null); // set current word to null for better referencing later
      clearInterval(id); // clear interval after playing
    };
  }, [playing]); //<-- Cannot place the current word here, otherwise it re-renders the play state when the word updates

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={TITLE_MARGIN}
      sx={{ width: "100%" }}
    >
      <Box
        display="flex"
        flexDirection="row"
        gap={TITLE_MARGIN}
        sx={{ width: "100%" }}
      >
        {/* The text showing how many words are left */}
        {playing && (
          <Typography
            variant="body1"
            fontWeight="bold"
            align="left"
            flexGrow="1" // fill remaining space
          >
            Word: {currentWordNumber} / {totalWordNumber}
          </Typography>
        )}

        {/* The text showing the current wpm */}
        {playing && (
          <Typography variant="body1" fontWeight="bold" align="right">
            Current wpm: {initialWpm}
          </Typography>
        )}
      </Box>

      {/* The main textfield for entering the paragraph */}
      {!playing && (
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
      {playing && (
        <Typography
          variant="h2"
          align="center"
          minHeight={MIN_TEXTFIELD_HEIGHT}
          sx={{
            overflowWrap: "break-word",
          }}
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
        {!playing && (
          <CustomButton
            text="Start"
            color="primary"
            startIcon={<PlayCircleFilledWhiteIcon />}
            variant="contained"
            onClick={async () => {
              // set playing to true
              setPlaying(true);
            }}
          />
        )}

        {/* Stop button with icon */}
        {playing && (
          <CustomButton
            text="Stop"
            color="secondary"
            startIcon={<StopCircleIcon />}
            variant="contained"
            onClick={() => {
              setPlaying(false);
            }}
          />
        )}
      </Box>
    </Box>
  );
}
