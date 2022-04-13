import React from "react";
import { Box, TextInput } from "grommet";
import { Search } from "grommet-icons";
import { useMediaQuery } from "react-responsive";
import ResponsiveHeader from "./ResponsiveHeader";

function HeaderComponent({ setShowSidebar }) {
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
      style={{
        background: "#ff5f6d",
        background: "-webkit-linear-gradient(to right, #ff5f6d, #ffc371)",
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        color: "white",
      }}
      justify={isDesktopOrLaptop ? "around" : "between"}
    >
      <ResponsiveHeader
        setShowSidebar={setShowSidebar}
        isDesktopOrLaptop={isDesktopOrLaptop}
      />
      <Box width="medium">
      </Box>
    </Box>
  );
}

export default HeaderComponent;
