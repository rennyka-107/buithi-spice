import { Box, Button, Menu } from "grommet";
import { Apps } from "grommet-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import _ from "lodash";
import { WrapContext } from "pages/_app";

function ResponsiveHeader({ isDesktopOrLaptop, setShowSidebar }) {
  const router = useRouter();
  const { auth } = useContext(WrapContext);
  const { user } = auth;
  if (isDesktopOrLaptop) {
    return (
      <Box width="100%" direction="row" justify="around">
        <Image
          src="/images/logo-header.png"
          width="300"
          height="80"
          alt="logo example"
        />
        <Box style={{ flex: ".8 0" }} justify="end" direction="row" gap="large">
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
              router.push("/products");
            }}
            plain
            label="Products"
            hoverIndicator
          />
          <Button
            onClick={() => {
              router.push("/posts");
            }}
            plain
            label="Posts"
            hoverIndicator
          />
          {user && (
            <Button
              onClick={() => {
                router.push("/admin");
              }}
              plain
              label="Dashboard"
              hoverIndicator
            />
          )}
          <Button
            onClick={() => {
              router.push("/about-us");
            }}
            plain
            label="About us"
            hoverIndicator
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box direction="row" gap="large" align="center">
      <Apps
        size="small"
        onClick={() => {
          _.isFunction(setShowSidebar) && setShowSidebar(true);
        }}
      />
    </Box>
  );
}

export default ResponsiveHeader;
