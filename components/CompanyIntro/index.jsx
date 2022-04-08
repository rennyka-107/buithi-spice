import { Box, Heading, Image, Paragraph } from "grommet";
import { useRouter } from "next/router";
import React from "react";
import { useMediaQuery } from "react-responsive";

function CompanyIntro() {
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  return (
    <Box
      margin="5em 0"
      width="80%"
      align="center"
      direction={isDesktopOrLaptop ? "row" : "column"}
      justify="around"
    >
      <div
        style={{ width: isDesktopOrLaptop ? "40%" : "100%" }}
        data-aos="fade-right"
        data-aos-delay="1000"
        data-aos-duration="2000"
      >
        <Image
          width="100%"
          height="350px"
          src="images/kisspng-drawing-agriculture-royalty-free-tractor-clip-art-hand-drawn-land-harvesting-wheat-5aa5d112583690.9368897615208164023613.png"
        />
      </div>
      <Box
        data-aos="fade-left"
        data-aos-delay="1000"
        data-aos-duration="2000"
        width={isDesktopOrLaptop ? "40%" : "100%"}
      >
        <Heading level="2">
          Welcome to{" "}
          <span
            style={{
              color:
                "limegreen",
            }}
          >
            BuiThi Agriculture
          </span>
        </Heading>
        <Paragraph>
          BuiThi Agriculture is fulfilling needs of Lotus seeds, Cassia /
          cinnamon, Star anise and lots of agricultural food commodities. Our
          business entity meets requirements worldwide for these assured
          commodities within committed duration that aids in serving varied
          buyers.
        </Paragraph>
        <a
          onClick={() => router.push("/about-us")}
          className="blog-slider__button"
        >
          READ MORE
        </a>
      </Box>
    </Box>
  );
}

export default CompanyIntro;
