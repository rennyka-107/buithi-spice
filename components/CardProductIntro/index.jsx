import { Card, CardBody, CardFooter, CardHeader, Image } from "grommet";
import { useRouter } from "next/router";
import React from "react";

function CardProductIntro({ title, description, imageUrl, slug }) {
  const router = useRouter();
  return (
    <Card
      style={{ boxShadow: "0px 14px 80px rgba(24, 25, 26, 0.5)", height: "auto" }}
      onClick={() => router.push(`/products/${slug}`)}
      height="medium"
      width="350px"
      background="light-1"
    >
      <Image width="100%" height="250px" src={imageUrl} alt="product example" />
      <CardHeader
        justify="center"
        as="h3"
        pad="small"
        style={{ margin: "0", color: "#ff5f6d" }}
      >
        {title}
      </CardHeader>
      <CardBody pad="medium" style={{ paddingTop: "0", fontStyle: "italic" }}>
        {description}
      </CardBody>
    </Card>
  );
}

export default CardProductIntro;
