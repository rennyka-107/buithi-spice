import { Box, Heading, Image, Tag } from "grommet";
import React from "react";
import { useMediaQuery } from "react-responsive";
import ProductApi from "services/products";
import parse from "html-react-parser";

function ViewProduct({ imageUrl = "", title = "", content = "", ...props }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  return (
    <>
      <Heading
        color="#ff5f6d"
        alignSelf="center"
        margin={isDesktopOrLaptop ? "1em 0" : "1em 0"}
        level="2"
      >
        {title}
      </Heading>
      <Box
        pad="medium"
        direction={isDesktopOrLaptop ? "row" : "column"}
        align={isDesktopOrLaptop ? "" : "center"}
        justify="around"
      >
        <Box width={isDesktopOrLaptop ? "35%" : "95%"} align="center">
          <Image
            alt="product profile example"
            src={imageUrl}
            width="100%"
            height="500"
          />
        </Box>
        <Box width={isDesktopOrLaptop ? "60%" : "95%"}>
          {parse(content)}
          {/* <Box pad="medium" direction="row" justify="center" gap="1em">
            <Heading alignSelf="center" level="5" margin="none">
              Tags:
            </Heading>
            <Tag value="value" />
            <Tag value="value" />
            <Tag value="value" />
            <Tag value="value" />
          </Box> */}
        </Box>
      </Box>
    </>
  );
}

export default ViewProduct;

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const {
      data: { product },
    } = await ProductApi.getProductBySlug(slug);
    return {
      props: {
        ...product,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Failed",
      },
    };
  }
}
