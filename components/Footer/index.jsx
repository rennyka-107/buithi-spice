import React from "react";
import { Button, Box, Heading, WorldMap } from "grommet";
import Image from "next/image";
import { Location, MailOption, Phone } from "grommet-icons";
import { useMediaQuery } from "react-responsive";

function FooterComponent() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  return (
    <Box
      background="dark-6"
      direction={isDesktopOrLaptop ? "row" : "column"}
      gap={isDesktopOrLaptop ? "" : "2em"}
      as="header"
      pad="large"
      animation={{ type: "fadeIn", duration: 3000 }}
      align="center"
      justify="center"
    >
      <Box width="50%" gap="small">
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          direction="row"
          margin="none"
        >
          <Location size="medium" />
          Address: 14 alleys 381/42 Thuy Phuong Street, Thuy Phuong Ward, Bac Tu
          Liem District, Hanoi.
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          icon={<Location color="plain" />}
          margin="none"
        >
          <Phone size="medium" />
          Mobi/Whatsapp/Viber: +84964210796
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          icon={<Location color="plain" />}
          margin="none"
        >
          <MailOption size="medium" />
          Email: buican.vinaherb@gmail.com
        </Heading>
      </Box>
      <Box>
        
        <Image
          src="/images/275063685_1005091196774697_8380784716009099865_n.png"
          width="150"
          height="150"
          alt="footer example"
        />
        
      </Box>
    </Box>
  );
}

export default FooterComponent;
