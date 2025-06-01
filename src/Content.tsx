import { Box, TextField, Typography } from "@mui/material";
import { CONTENT_MARGIN, MIN_TEXTFIELD_HEIGHT, TITLE_MARGIN } from "./Values";
import type React from "react";
import { useEffect, useRef, useState, type SetStateAction } from "react";
import CustomButton from "./CustomButton";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import split from "./split";

export interface Props {
  text: String;
  setText: React.Dispatch<SetStateAction<String>>;
}

export default function Content({ text, setText }: Props) {
  // store the initial wpm, final wpm and also the duration
  const [initialWpm, setInitialWpm] = useState<number>(200);
  const [finalWpm, setFinalWpm] = useState<number>(200);
  const [duration, setDuration] = useState<number>(10);
  const [currentWpm, setCurrentWpm] = useState<number>(200);

  // store the current word number to be displayed, or none if there aren't any
  // if current word is none, then it is not in a displaying state
  const [currentWordNumber, setCurrentWordNumber] = useState<number>(0);
  const [totalWordNumber, setTotalWordNumber] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<String | null>(null);

  // state to check if it is playing
  const [playing, setPlaying] = useState(false);

  // use ref to avoid closure problems remembering the previous runs
  const wordNumberRef = useRef<number>(0);
  const wpmRef = useRef<number>(initialWpm);
  const timeElapsed = useRef<number>(0);

  // use effect block to display word animations.
  // Trigger when the dependency (playing) changes -- set to TRUE or set to FALSE
  useEffect(() => {
    // function called when the loop exits (Finished playing or when stopped)
    function exit() {
      setCurrentWordNumber(0); // set current and total word number to 0
      setTotalWordNumber(0);
      setCurrentWord(null); // reset the current word
    }

    if (!playing) {
      return;
    }

    // split the paragraph
    const wordList = split(text);

    // set current word to be the first word initially (for display purposes)
    setCurrentWord(wordList[0]);

    // set the current word number to be 0 and the current wpm to be the initial wpm
    wordNumberRef.current = 0;
    setCurrentWordNumber(0);
    wpmRef.current = initialWpm;
    setCurrentWpm(wpmRef.current);
    timeElapsed.current = 0;

    // set the total word number
    setTotalWordNumber(wordList.length);

    // recursive play function that plays faster gradually
    function play() {
      // display the current word
      setCurrentWord(wordList[wordNumberRef.current]);

      // modify word number
      wordNumberRef.current += 1;
      setCurrentWordNumber(wordNumberRef.current);

      // calculate the new wpm by solving the equation of slope (final-initial)/duration = (x-initial)/time
      const interval = 60000 / wpmRef.current;
      timeElapsed.current += interval;

      // cap the wpm to final wpm, and calculate only when it is less than it
      if (wpmRef.current != finalWpm) {
        wpmRef.current = Math.min(
          finalWpm,
          initialWpm +
            ((finalWpm - initialWpm) / (duration * 1000)) * timeElapsed.current
        );
      }

      setCurrentWpm(wpmRef.current);

      // recursively call playing if the word number does not exceed length
      if (wordNumberRef.current > wordList.length) {
        exit();
        setPlaying(false);
      } else {
        setTimeout(play, interval); // recursive call here, interval being the delay
      }
    }

    play();

    return () => exit();
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
            Current wpm: {Math.round(currentWpm * 10) / 10}
            {/* Round to 1 dp */}
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
