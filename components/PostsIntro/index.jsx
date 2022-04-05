import CardPostIntro from "components/CardPostIntro";
import { Box, Heading } from "grommet";
import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import "swiper/dist/css/swiper.min.css";

function PostsIntro({ posts = [1, 2, 3] }) {
  useEffect(() => {
    const swiper = new Swiper(".blog-slider", {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      mousewheel: {
        invert: false,
      },
      autoplay: {
        autoplay: 2000,
      },
      // autoHeight: true,
      pagination: {
        el: ".blog-slider__pagination",
        clickable: true,
      },
    });
  }, []);
  return (
    <Box width="80%" pad="small" align="center">
      <Heading level="2" margin="none">
        Posts
      </Heading>
      <Box direction="row" pad="3em 0" width="100%" justify="between">
        <div className="blog-slider">
          <div className="blog-slider__wrp swiper-wrapper">
            {posts.map((post, idx) => (
              <CardPostIntro key={`${idx} swiper-tachyon`} post={post} />
            ))}
          </div>
          <div className="blog-slider__pagination"></div>
        </div>
      </Box>
    </Box>
  );
}

export default PostsIntro;
