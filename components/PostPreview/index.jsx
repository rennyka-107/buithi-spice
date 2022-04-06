import { Box, Button, Heading, Layer } from "grommet";
import React from "react";

export default function PostPreview({ open, setOpen, content }) {
  return (
    <>
      {open && (
        <Layer
          margin="10em 0"
          style={{ minWidth: "50%", maxWidth: "auto", overflow: "auto" }}
          animation="slide"
          onEsc={() => setOpen(false)}
          onClickOutside={() => setOpen(false)}
        >
          <Box direction="column" gap="1em">
            <Heading level="2" margin=".5em">
              Post Preview
            </Heading>
            <Box margin=".5em">{content}</Box>
          </Box>
        </Layer>
      )}
    </>
  );
}
