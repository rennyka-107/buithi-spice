import React from "react";
import { Box, TextInput } from "grommet";
import {  Search } from "grommet-icons";
import { useMediaQuery } from "react-responsive";
import ResponsiveHeader from "./ResponsiveHeader";

function HeaderComponent({setShowSidebar}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 899px)" });
  return (
    <Box
      direction="row"
      as="header"
      pad="small"
      animation={{ type: "fadeIn", duration: 3000 }}
      align="center"
      justify={isDesktopOrLaptop ? "around" : "between"}
    >
      <ResponsiveHeader setShowSidebar={setShowSidebar} isDesktopOrLaptop={isDesktopOrLaptop} />
      <Box width="medium">
        <TextInput
          icon={<Search />}
          placeholder="Search somethings..."
          value=""
          size="small"
          // onChange={(event) => setValue(event.target.value)}
        />
      </Box>
    </Box>
  );
}

export default HeaderComponent;
