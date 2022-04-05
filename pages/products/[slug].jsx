import { Box, Heading, Image, Tag } from "grommet";
import React from "react";
import { useMediaQuery } from "react-responsive";

function ViewProduct() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  return (
    <>
      <Box
        pad="medium"
        direction={isDesktopOrLaptop ? "row" : "column"}
        align={isDesktopOrLaptop ? "" : "center"}
        justify="around"
      >
        <Box width={isDesktopOrLaptop ? "35%" : "95%"} align="center">
          <Heading margin="0 0 1em 0" level="2">
            Example image
          </Heading>
          <Image src="/images/profile-1.jpg" width="100%" height="500" />
        </Box>
        <Box width={isDesktopOrLaptop ? "60%" : "95%"} align="center">
          <Heading margin={isDesktopOrLaptop ? "0 0 1em 0" : "1em 0"} level="2">
            Lorem ipsum
          </Heading>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. What is Lorem
          Ipsum? Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. What is Lorem
          Ipsum? Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. What is Lorem
          Ipsum? Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. What is Lorem
          Ipsum? Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
          <Box pad="medium" direction="row" justify="center" gap="1em">
            <Heading alignSelf="center" level="5" margin="none">
              Tags:
            </Heading>
            <Tag value="value" />
            <Tag value="value" />
            <Tag value="value" />
            <Tag value="value" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ViewProduct;
