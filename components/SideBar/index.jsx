import { Avatar, Button, Image, Nav, Sidebar } from "grommet";
import React from "react";
import { useRouter } from "next/router";

function SideBar() {
  const router = useRouter();

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
      header={
        <Image width="100" height="100" src="/images/logo.png" />
      }
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
