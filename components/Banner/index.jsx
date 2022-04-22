import { Box, Carousel, Image, TextInput } from "grommet";
import { Search } from "grommet-icons";
import React from "react";

function Banner() {
  return (
    <Box
      data-aos="flip-left"
      data-aos-delay="1000"
      data-aos-duration="2000"
      width="100%"
      style={{ backgroundSize: "600px", position: "relative" }}
      overflow="hidden"
    >
      <Carousel
        controls={false}
        style={{ width: "100%", margin: "auto", opacity: ".65" }}
        fill
        play={5000}
      >
        <Image
          width="100%"
          height="600px"
          alt="banner1 example"
          src="images/banner-1.jpg"
        />
        <Image
          width="100%"
          height="600px"
          alt="banner2 example"
          src="images/banner-2.jpg"
        />
        <Image
          width="100%"
          height="600px"
          alt="banner3 example"
          src="images/banner-3.jpg"
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
        <p style={{ textAlign: "center", fontSize: "70px", color: "white" }}>
          Welcome to{" "}
          <span
            style={{
              color: "#ff5f6d",
            }}
          >
            BuiThi Agriculture
          </span>
        </p>
      </Box>
    </Box>
  );
}

export default Banner;
