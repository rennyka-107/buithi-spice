import {
  Box,
  Button,
  Image,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tabs,
} from "grommet";
import { Article, CatalogOption, ProductHunt } from "grommet-icons";
import withAuth from "hoc/withAuth";
import React, { useEffect, useState } from "react";
import ProductApi from "services/products";
import PostApi from "services/posts";
import CategoryApi from "services/categories";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const HeaderRender = {
  products: [
    "Title",
    "Description",
    "Image",
    "Created at",
    "Slug",
    "Category",
    "Action",
  ],
  posts: [
    "Title",
    "Description",
    "Image",
    "Created at",
    "Slug",
    "Category",
    "Action",
  ],
  categories: ["Name", "Description", "Image", "Action"],
};

function AdminDashBoard() {
  const router = useRouter();
  const [objectData, setObjectData] = useState({
    activeTab: 0,
    data: [],
    page: 1,
    size: 10,
    total: 0,
    loading: false,
  });

  function callDeleteApi(name, id) {
    if (confirm("Are you sure want delete this item?"))
      switch (name) {
        case "product":
          ProductApi.deleteProduct(id)
            .then((res) => {
              if (res && res.data && res.data.status) {
                toast.success("Deleted successfully!");
                fetchData();
              } else {
                toast.error("Failed! Please try again!");
              }
            })
            .catch((err) => toast.error("Failed! Please try again!"));
          break;
        case "post":
          PostApi.deletePost(id)
            .then((res) => {
              if (res && res.data && res.data.status) {
                toast.success("Deleted successfully!");
                fetchData();
              } else {
                toast.error("Failed! Please try again!");
              }
            })
            .catch((err) => toast.error("Failed! Please try again!"));
          break;
        case "category":
          CategoryApi.deleteCategory(id)
            .then((res) => {
              if (res && res.data && res.data.status) {
                toast.success("Deleted successfully!");
                fetchData();
              } else {
                toast.error("Failed! Please try again!");
              }
            })
            .catch((err) => toast.error("Failed! Please try again!"));
          break;
      }
  }

  async function fetchData() {
    try {
      setObjectData({ ...objectData, loading: true });
      const { page, size, activeTab } = objectData;
      let result;
      if (activeTab === 0) {
        result = await ProductApi.getAllProducts({ page, size });
      }
      if (activeTab === 1) {
        result = await PostApi.getAllPosts({ page, size });
      }
      if (activeTab === 2) {
        result = await CategoryApi.getAllCategories({ page, size });
      }
      if (result.data) {
        let data;
        switch (activeTab) {
          case 0:
            data = result.data.products;
            break;
          case 1:
            data = result.data.posts;
            break;
          case 2:
            data = result.data.categories;
            break;
        }
        setObjectData({ ...objectData, data, loading: false });
      } else {
        setObjectData({ ...objectData, loading: false });
      }
    } catch (err) {
      toast.error("Failed! Please try again!");
    }
  }

  function renderHeader() {
    switch (objectData.activeTab) {
      case 0:
        return HeaderRender.products.map((hr, idx) => (
          <TableCell
            key={idx + "header"}
            scope="col"
            background="#ff5f6d"
            style={{
              color: "white",
            }}
          >
            {hr}
          </TableCell>
        ));
      case 1:
        return HeaderRender.posts.map((hr, idx) => (
          <TableCell
            style={{
              color: "white",
            }}
            background="#ff5f6d"
            key={idx + "header"}
            scope="col"
          >
            {hr}
          </TableCell>
        ));
      case 2:
        return HeaderRender.categories.map((hr, idx) => (
          <TableCell
            style={{
              color: "white",
            }}
            background="#ff5f6d"
            key={idx + "header"}
            scope="col"
          >
            {hr}
          </TableCell>
        ));
    }
  }

  function renderBody() {
    if (objectData.activeTab !== 2) {
      return objectData.data.map((ch, idx) => (
        <TableRow
          style={{ height: "auto", verticalAlign: "top" }}
          key={idx + "row"}
        >
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            {ch.title}
          </TableCell>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            {ch.description}
          </TableCell>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            <Image width="50px" height="50px" src={ch.imageUrl} />
          </TableCell>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            {dayjs(ch.createdAt, "DD-MM-YYYY").toString()}
          </TableCell>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            {ch.slug}
          </TableCell>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            {ch.category}
          </TableCell>
          <TableCell border background="white">
            <Box direction="row" gap=".5em">
              <Button
                style={{ width: "33%" }}
                hoverIndicator
                color="status-ok"
                onClick={() =>
                  router.push(
                    `/${objectData.activeTab === 0 ? "products" : "posts"}/${
                      ch.slug
                    }`
                  )
                }
              >
                Detail
              </Button>
              <Button
                style={{ width: "33%" }}
                hoverIndicator
                color="neutral-3"
                onClick={() =>
                  router.push(
                    `/${
                      objectData.activeTab === 0 ? "products" : "posts"
                    }/edit/${ch.slug}`
                  )
                }
              >
                Edit
              </Button>
              <Button
                onClick={() =>
                  callDeleteApi(
                    objectData.activeTab === 0 ? "product" : "post",
                    ch.id
                  )
                }
                style={{ width: "33%" }}
                hoverIndicator
                color="red"
              >
                Delete
              </Button>
            </Box>
          </TableCell>
        </TableRow>
      ));
    } else {
      return objectData.data.map((ch, idx) => (
        <TableRow style={{ verticalAlign: "top" }} key={idx + "row"}>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            {ch.name}
          </TableCell>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            {ch.description}
          </TableCell>
          <TableCell
            border
            style={{
              color: "#ff5f6d",
              maxWidth: "500px",
              wordBreak: "break-word",
            }}
            background="white"
            scope="row"
          >
            <Image width="50px" height="50px" src={ch.imageUrl} />
          </TableCell>
          <TableCell border background="white">
            <Box direction="row" gap=".5em">
              <Button
                style={{ width: "33%" }}
                hoverIndicator
                color="neutral-3"
                onClick={() => router.push(`/categories/edit/${ch.id}`)}
              >
                Edit
              </Button>
              <Button
                onClick={() => callDeleteApi("category", ch.id)}
                style={{ width: "33%" }}
                hoverIndicator
                color="red"
              >
                Delete
              </Button>
            </Box>
          </TableCell>
        </TableRow>
      ));
    }
  }

  useEffect(() => {
    fetchData();
  }, [objectData.activeTab, objectData.page, objectData.size]);

  return (
    <Tabs
      activeIndex={objectData.activeTab}
      onActive={(value) => {
        setObjectData({ ...objectData, activeTab: value });
      }}
      pad="3em 0"
      width="100%"
      style={{ color: "#ff5f6d" }}
    >
      {[
        { title: "Products", icon: <ProductHunt /> },
        { title: "Posts", icon: <Article /> },
        { title: "Categories", icon: <CatalogOption /> },
      ].map((el, idx) => (
        <Tab
          disabled={objectData.loading}
          key={idx}
          icon={el.icon}
          title={el.title}
        >
          <Box align="center" pad="2em  ">
            <Button
              hoverIndicator
              color="#ff5f6d"
              onClick={() =>
                router.push(
                  `/${
                    objectData.activeTab === 0
                      ? "products"
                      : objectData.activeTab === 1
                      ? "posts"
                      : "categories"
                  }/create`
                )
              }
              label={`Create new ${
                objectData.activeTab === 0
                  ? "products"
                  : objectData.activeTab === 1
                  ? "posts"
                  : "categories"
              }`}
            />
          </Box>
          <Box pad="1em 3em" direction="row" justify="center">
            {objectData.loading ? (
              <Spinner size="xlarge" />
            ) : (
              <Table
                style={{
                  display: "block",
                  overflowX: "auto",
                }}
              >
                <TableHeader color="brand">
                  <TableRow>{renderHeader()}</TableRow>
                </TableHeader>
                <TableBody>{renderBody()}</TableBody>
              </Table>
            )}
          </Box>
        </Tab>
      ))}
    </Tabs>
  );
}

export default withAuth(AdminDashBoard);
