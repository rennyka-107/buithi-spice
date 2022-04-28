import { Box, Carousel, Heading, TextInput } from "grommet";
import Image from "next/image";
import React from "react";

function Banner() {
  return (
    <Box
      data-aos="flip-left"
      data-aos-delay="1000"
      data-aos-duration="2000"
      width="100vw"
      style={{ backgroundSize: "600px", position: "relative" }}
      overflow="hidden"
    >
      <Carousel
        controls={false}
        style={{ width: "100vw", margin: "auto", opacity: ".65" }}
        fill
        play={5000}
      >
        <Image
          unoptimized
          priority
          width="100vw"
          height="600px"
          alt="banner1 example"
          src="/images/banner-1.jpg"
        />
        <Image
          unoptimized
          priority
          width="100vw"
          height="600px"
          alt="banner2 example"
          src="/images/banner-2.jpg"
        />
        <Image
          unoptimized
          priority
          width="100vw"
          height="600px"
          alt="banner3 example"
          src="/images/banner-3.jpg"
        />
      </Carousel>
      <Box
        data-aos="fade-left"
        data-aos-delay="1000"
        data-aos-duration="2000"
        style={{ position: "absolute", top: "40%" }}
        width="100%"
        align="center"
      >
        <Heading level="1" color="white" style={{ textAlign: "center" }}>
          Welcome to{" "}
          <span
            style={{
              color: "#ff5f6d",
            }}
          >
            BuiThi Agriculture
          </span>
        </Heading>
      </Box>
    </Box>
  );
}

export default Banner;
