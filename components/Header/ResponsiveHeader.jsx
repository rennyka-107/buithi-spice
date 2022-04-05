import {  Box, Button } from "grommet";
import { Apps } from "grommet-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import _ from "lodash";

function ResponsiveHeader({ isDesktopOrLaptop, setShowSidebar }) {
  const router = useRouter();
  if (isDesktopOrLaptop) {
    return (
      <Box direction="row" gap="large">
        <Image
          src="/images/275063685_1005091196774697_8380784716009099865_n.png"
          width="80"
          height="80"
        />
        <Button
          onClick={() => {
            router.push("/");
          }}
          plain
          label="Home"
          hoverIndicator
        />
        <Button
          onClick={() => {
            router.push("/products/123");
          }}
          plain
          label="Products"
          hoverIndicator
        />
        <Button
          onClick={() => {
            router.push("/about-us");
          }}
          plain
          label="About us"
          hoverIndicator
        />
      </Box>
    );
  }
  return (
    <Box direction="row" gap="large" align="center">
      <Apps
        size="medium"
        onClick={() => {
          _.isFunction(setShowSidebar) && setShowSidebar(true);
        }}
      />
    </Box>
  );
}

export default ResponsiveHeader;
