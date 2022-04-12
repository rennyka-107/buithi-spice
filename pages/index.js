import Banner from "components/Banner";
import CompanyIntro from "components/CompanyIntro";
import PostsIntro from "components/PostsIntro";
import ProductsIntro from "components/ProductsIntro";
import { Box } from "grommet";
import { isEmpty } from "lodash";
import PostApi from "services/posts";
import ProductApi from "services/products";

export default function Home({ products, posts, errors }) {
  return (
    <Box align="center">
      <Banner />
      <CompanyIntro />
      {!isEmpty(products) && <ProductsIntro products={products} />}
      {!isEmpty(posts) && <PostsIntro posts={posts} />}
    </Box>
  );
}

export async function getServerSideProps(context) {
  let propsPosts;
  let propsProducts;
  let propsErrors;
  try {
    const { data: dataPosts } = await PostApi.getAllPosts({
      page: 1,
      size: 3,
    });
    const { data: dataProducts } = await ProductApi.getAllProducts({
      page: 1,
      size: 3,
    });
    if (dataPosts && dataPosts.status) {
      propsPosts = dataPosts.posts;
    }
    if (dataProducts && dataProducts.status) {
      propsProducts = dataProducts.products;
    }
  } catch (error) {
    propsErrors = "Failed";
  }
  return {
    props: {
      errors: propsErrors || "",
      posts: propsPosts || [],
      products: propsProducts || [],
    },
  };
}
