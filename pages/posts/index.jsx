import { Box, Heading } from "grommet";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import CategoryApi from "services/categories";
import { useMediaQuery } from "react-responsive";
import CardProductIntro from "components/CardProductIntro";
import PostApi from "services/posts";
import { isEmpty } from "lodash";

const ViewListPost = () => {
  const [objectCategories, setObjectCategories] = useState({
    categories: [],
    loading: false,
    chooseCategories: [],
    posts: [],
  });

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });

  useEffect(() => {
    setObjectCategories({ ...objectCategories, loading: true });
    CategoryApi.getAllCategories({
      page: 1,
      size: 5,
    })
      .then((res) => {
        if (res.data && res.data.status) {
          const formatArry = res.data.categories.map((cate) => ({
            value: cate.id,
            label: cate.name,
          }));
          setObjectCategories({
            ...objectCategories,
            categories: formatArry,
            loading: false,
          });
        }
      })
      .catch((err) => {
        setObjectCategories({ ...objectCategories, loading: false });
      });
  }, []);

  useEffect(() => {
    if (!isEmpty(objectCategories.chooseCategories)) {
      setObjectCategories({ ...objectCategories, loading: true });
      PostApi.getPostsByCategory({
        page: 1,
        size: 100,
        ids: objectCategories.chooseCategories,
      })
        .then((res) => {
          if (res.data) {
            setObjectCategories({
              ...objectCategories,
              loading: false,
              posts: res.data.posts,
            });
          }
        })
        .catch((err) =>
          setObjectCategories({
            ...objectCategories,
            loading: false,
          })
        );
    }
  }, [objectCategories.chooseCategories]);

  return (
    <Box align="center" gap="small" pad="large" width="100%" direction="column">
      <Heading color="#ff5f6d" margin="medium" level="2">
        Posts List
      </Heading>
      <Select
        styles={{
          container: (styles) => ({
            ...styles,
            minWidth: isDesktopOrLaptop ? "50%" : "100%",
          }),
        }}
        placeholder="Select any categories ..."
        options={objectCategories.categories}
        isMulti
        closeMenuOnSelect={false}
        isLoading={objectCategories.loading}
        isSearchable
        isDisabled={objectCategories.loading}
        onChange={(values) =>
          setObjectCategories({
            ...objectCategories,
            chooseCategories: values.map((vl) => vl.value),
          })
        }
      />
      <Box
        data-aos="zoom-in"
        data-aos-delay="1000"
        data-aos-duration="2000"
        width="80%"
        pad="3em 0 1em 0"
        justify={isDesktopOrLaptop ? "between" : "center"}
        direction="row"
        style={{ flexWrap: "wrap", gap: "2em" }}
      >
        {objectCategories.posts.map((post, idx) => (
          <CardProductIntro key={`post-intro-${idx}`} {...post} />
        ))}
      </Box>
    </Box>
  );
};

export default ViewListPost;
