import { Card, CardBody, CardFooter, CardHeader, Image } from "grommet";
import { useRouter } from "next/router";
import React from "react";

function CardProductIntro({ name, content }) {
  const router = useRouter();
  return (
    <Card
      style={{ boxShadow: "0px 14px 80px rgba(24, 25, 26, 0.5)" }}
      onClick={() => router.push("/products/123")}
      height="medium"
      width="350px"
      background="light-1"
    >
      <Image
        width="100%"
        height="250px"
        src="images/7Z_2104.w028.n002.57A.p15.57.jpg"
        alt="product example"
      />
      <CardHeader as="h4" pad="small" style={{ margin: "0" }}>
        {name}
      </CardHeader>
      <CardBody pad="small" style={{ paddingTop: "0" }}>
        {content}
      </CardBody>
      {/* <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Button icon={<Icons.Favorite color="red" />} hoverIndicator />
        <Button icon={<Icons.ShareOption color="plain" />} hoverIndicator />
        Footer card
      </CardFooter> */}
    </Card>
  );
}

export default CardProductIntro;
