import Banner from "components/Banner";
import CompanyIntro from "components/CompanyIntro";
import PostsIntro from "components/PostsIntro";
import ProductsIntro from "components/ProductsIntro";
import { Box } from "grommet";

export default function Home() {
  return (
    <Box align="center">
      <Banner />
      <CompanyIntro />
      <ProductsIntro />
      <PostsIntro />
    </Box>
  );
}
