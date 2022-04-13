import React from "react";
import { Button, Box, Heading, WorldMap, Avatar } from "grommet";
import Image from "next/image";
import { Amazon, Location, MailOption, Phone } from "grommet-icons";
import { useMediaQuery } from "react-responsive";

function FooterComponent() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  return (
    <Box
      direction={isDesktopOrLaptop ? "row" : "column"}
      gap={isDesktopOrLaptop ? "" : "2em"}
      as="header"
      pad="large"
      style={{
        background: "#ff5f6d",
        background: "-webkit-linear-gradient(to right, #ff5f6d, #ffc371)",
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        color: "white",
      }}
      animation={{ type: "fadeIn", duration: 3000 }}
      align="center"
      justify={isDesktopOrLaptop ? "around" : "center"}
    >
      <Box>
        <Image width="200" height="200" src="/images/logo.png" />
      </Box>
      <Box gap="small">
        <Heading alignSelf="center" level="3" style={{ fontWeight: "bold" }}>
          Contact
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          direction="row"
          margin="none"
        >
          <Location color="white" size="medium" />
          Address: 14 alleys 381/42 Thuy Phuong Street, Thuy Phuong Ward, Bac Tu
          Liem District, Hanoi.
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          icon={<Location color="plain" />}
          margin="none"
        >
          <Phone color="white" size="medium" />
          Mobi/Whatsapp/Viber: +84964210796
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          icon={<Location color="plain" />}
          margin="none"
        >
          <MailOption color="white" size="medium" />
          Email: buican.vinaherb@gmail.com
        </Heading>
      </Box>
      <Box gap="small">
        <Heading alignSelf="center" level="3" style={{ fontWeight: "bold" }}>
          Ecommerce shop
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          direction="row"
          margin="none"
        >
          Alibaba
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          icon={<Location color="plain" />}
          margin="none"
        >
          Tradeindia
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          icon={<Location color="plain" />}
          margin="none"
        >
          Globaltradeplaza
        </Heading>
        <Heading
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          level="4"
          icon={<Location color="plain" />}
          margin="none"
        >
          Amazon
        </Heading>
      </Box>
    </Box>
  );
}

export default FooterComponent;
