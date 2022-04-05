import { Box, Carousel, Image } from "grommet";
import React from "react";

function Banner() {
  return (
    <Box width="xxlarge" background="brand" height="500px" overflow="hidden">
        <Carousel fill play={5000}>
          <Image
            fit="cover"
            src="images/banner-1.jpg"
          />
          <Image fit="cover" src="images/banner-2.jpg" />
          <Image fit="cover" src="images/banner-3.jpg" />
        </Carousel>
    </Box>
  );
}

export default Banner;
