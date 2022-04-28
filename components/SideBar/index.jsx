import { Box, Button, Nav, Sidebar } from "grommet";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { WrapContext } from "pages/_app";
import Image from "next/image";

function SideBar() {
  const router = useRouter();
  const { auth } = useContext(WrapContext);
  const { user } = auth;
  return (
    <Sidebar
      data-aos="fade-right"
      style={{
        position: "absolute",
        zIndex: "999",
        alignItems: "center",
        background: "#ff5f6d",
        background: "-webkit-linear-gradient(to right, #ff5f6d, #ffc371)",
        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        color: "white",
      }}
      header={<Image width="100" height="100" src="/images/logo-footer.png" />}
    >
      <Nav pad="1em" gap="large" align="center">
        <Button
          onClick={() => {
            router.push("/");
          }}
          plain
          label="Home"
          hoverIndicator
        />
        {user && (
          <Box gap="large" align="center">
            <Button
              onClick={() => {
                router.push("/products/create");
              }}
              plain
              label="Create Product"
              hoverIndicator
            />
            <Button
              onClick={() => {
                router.push("/posts/create");
              }}
              plain
              label="Create Post"
              hoverIndicator
            />
            <Button
              onClick={() => {
                router.push("/categories/create");
              }}
              plain
              label="Create Category"
              hoverIndicator
            />
            <Button
              onClick={() => {
                router.push("/admin");
              }}
              plain
              label="Dashboard"
              hoverIndicator
            />
          </Box>
        )}
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
        <Button
          onClick={() => {
            router.push("/about-us");
          }}
          plain
          label="About us"
          hoverIndicator
        />
      </Nav>
    </Sidebar>
  );
}

export default SideBar;
