import { Card, CardBody, CardFooter, CardHeader, Image } from "grommet";
import { useRouter } from "next/router";
import React from "react";

function CardProductIntro({ title, description, imageUrl, id, ...props }) {
  const router = useRouter();
  return (
    <Card
      style={{ boxShadow: "0px 14px 80px rgba(24, 25, 26, 0.5)" }}
      onClick={() => router.push(`/products/${id}`)}
      height="medium"
      width="350px"
      background="light-1"
    >
      <Image width="100%" height="250px" src={imageUrl} alt="product example" />
      <CardHeader as="h4" pad="small" style={{ margin: "0" }}>
        {title}
      </CardHeader>
      <CardBody pad="small" style={{ paddingTop: "0" }}>
        {description}
      </CardBody>
    </Card>
  );
}

export default CardProductIntro;
