import CardProductIntro from "components/CardProductIntro";
import { Box, Heading } from "grommet";
import React from "react";

function ProductsIntro({ products }) {
  return (
    <Box
      data-aos="zoom-in"
      data-aos-delay="1000"
      data-aos-duration="2000"
      width="80%"
      margin="4em 0"
      pad="medium"
      align="center"
    >
      <Heading
        className="linear-header"
        level="2"
        margin="none"
      >
        Products
      </Heading>
      <Box
        style={{ flexWrap: "wrap", gap: "2em" }}
        direction="row"
        pad="3em 0 1em 0"
        width="xlarge"
        justify="center"
      >
        {products.map((product, idx) => (
          <CardProductIntro key={`product-intro-${idx}`} {...product} />
        ))}
      </Box>
    </Box>
  );
}

export default ProductsIntro;
