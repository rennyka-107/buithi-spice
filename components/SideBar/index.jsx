import { Avatar, Button, Nav, Sidebar } from "grommet";
import React from "react";
import { useRouter } from "next/router";

function SideBar() {
  const router = useRouter();

  return (
    <Sidebar
      data-aos="fade-right"
      style={{ position: "absolute", zIndex: "999", alignItems: "center" }}
      background="brand"
      header={
        <Avatar src="/images/275063685_1005091196774697_8380784716009099865_n.png" />
      }
    >
      <Nav gap="medium" align="center">
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
