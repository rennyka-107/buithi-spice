import CardProductIntro from "components/CardProductIntro";
import { Box, Heading } from "grommet";
import React from "react";

function ProductsIntro() {
  return (
    <Box pad="medium" align="center">
      <Heading level="2" margin="none">
        Products
      </Heading>
      <Box style={{ flexWrap: "wrap", gap: "2em"}} direction="row" pad="3em 0" width="xlarge" justify="center">
        {[
          {
            name: "Peanut without shell and cover",
            content:
              "Peanut without shell and cover Peanut The peanut, or groundnut (Arachis hypogaea), is a species in the legume or “bean”",
          },
          {
            name: "Cloves Grade B",
            content:
              "Cloves Grade B Cloves Grade B Other names Bourgeon Floral de Clou de Girofle, Bouton Floral de Clou de Girofle",
          },
          {
            name: "Cinnamon Tube Grade C",
            content:
              "Cinnamon Tube Grade C   Cinnamon Tube Grade C/  Cassia Tube Grade C Cinnamon is a spice obtained from the.",
          },
        ].map((product, idx) => (
          <CardProductIntro
            key={`product-intro-${idx}`}
            name={product.name}
            content={product.content}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ProductsIntro;
