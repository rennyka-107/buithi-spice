import { Box, Carousel, Image } from "grommet";
import React from "react";

function Banner() {
  return (
    <Box
      width="100%"
      background="url(images/71db850127cdb08910945edecb41df71.jpg)"
      height="600px"
      style={{ backgroundSize: "50% 600px" }}
      overflow="hidden"
    >
      <Carousel
        controls="selectors"
        style={{ width: "40%", margin: "auto", marginTop: "16em" }}
        fill
        play={5000}
      >
        <Image
          height="280px"
          width="100%"
          alt="banner1 example"
          src="images/banner-1.jpg"
        />
        <Image
          height="280px"
          width="100%"
          alt="banner2 example"
          src="images/banner-2.jpg"
        />
        <Image
          height="280px"
          width="100%"
          alt="banner3 example"
          src="images/banner-3.jpg"
        />
      </Carousel>
    </Box>
  );
}

export default Banner;
