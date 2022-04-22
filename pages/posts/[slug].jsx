import { Box, Heading, Image, Tag } from "grommet";
import React from "react";
import PostApi from "services/posts";
import parse from "html-react-parser";
import BasePageLoading from "components/BasePageLoading";

function ViewPost({ imageUrl, title, content, error, ...props }) {
  if (!isEmpty(error)) {
    router.push("/");
    return <BasePageLoading />;
  }
  return (
    <>
      <Box pad="medium" direction={"column"} align="center" justify="around">
        <Box width="60%" align="center">
          <Image
            alt="product profile example"
            src={imageUrl}
            width="100%"
            height="500"
          />
        </Box>
        <Box width="80%" align="center">
          <Heading color="#ff5f6d" margin="1em 0" level="2">
            {title}
          </Heading>
          <Box width="100%">{parse(content)}</Box>
        </Box>
      </Box>
    </>
  );
}

export default ViewPost;

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const {
      data: { post },
    } = await PostApi.getPostBySlug(slug);
    return {
      props: {
        ...post,
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
