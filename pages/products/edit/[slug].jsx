import React, { useContext, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { isValidFileImage } from "helpers/validate";
import { Controller, useForm } from "react-hook-form";
import ProductApi from "services/products";
import { convertToSlug } from "helpers";
import { useRouter } from "next/router";
import withAuth from "hoc/withAuth";
import CategoryApi from "services/categories";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormField,
  Heading,
  Image,
  Spinner,
  TextInput,
} from "grommet";
import CategoriesDropDown from "components/CategoriesDropDown";
import { useMediaQuery } from "react-responsive";
import CkEditorComponent from "components/CkEditorComponent";
import PostPreview from "components/PostPreview";

export default withAuth(function EditProduct() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorFile, setErrorFile] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const inputRef = useRef(null);
  const [id, setId] = useState();
  const [originValue, setOriginValue] = useState();
  const [disableUpdate, setDisableUpdate] = useState(true);

  useEffect(async () => {
    if (slug) {
      try {
        const cateRes = CategoryApi.getAllCategories({
          page: 1,
          size: 5,
        });
        const proRes = ProductApi.getProductBySlug(slug);
        const result = await Promise.all([cateRes, proRes]);
        const [resultCate, resultPro] = result;
        if (resultPro.data && resultPro.data.status) {
          const { product } = resultPro.data;
          setContent(product.content);
          setFile(product.imageUrl);
          setValue("title", product.title);
          setValue("description", product.description);
          setId(product.id);
          setOriginValue({
            title: product.title,
            description: product.description,
            categoryId: product.categoryId,
            image: "",
            content: product.content,
          });
          if (resultCate.data && resultCate.data.status) {
            setCategories(resultCate.data.categories);
            resultCate.data.categories.forEach((ct) => {
              if (ct.id === product.categoryId) {
                setValue("category", ct);
              }
            });
          }
        }
      } catch (err) {
        toast.error("Failed! Please try again!");
      }
    }
  }, [slug]);

  useEffect(() => {
    if (
      originValue &&
      watch("title") &&
      watch("description") &&
      watch("category") &&
      content
    ) {
      const validTitle = originValue.title !== watch("title");
      const validDescription = originValue.description !== watch("description");
      const validCategoryId = originValue.categoryId !== watch("category").id;
      const validImage = originValue.image !== image;
      const validContent = originValue.content !== content;
      console.log(
        validTitle,
        validDescription,
        validCategoryId,
        validImage,
        validContent,
        "valid"
      );
      if (
        validTitle ||
        validCategoryId ||
        validContent ||
        validDescription ||
        validImage
      ) {
        setDisableUpdate(false);
      } else {
        setDisableUpdate(true);
      }
    } else {
      setDisableUpdate(true);
    }
  }, [originValue, watch("title"), watch("description"), watch("category"), image, content]);

  async function onSubmit(data) {
    setLoading(true);
    ProductApi.updateProduct(id, {
      slug: convertToSlug(data.title),
      ...data,
      category_id: data?.category?.id,
      image,
      content,
      _method: "put",
    })
      .then((result) => {
        if (result.data && result.data.product) {
          router.push(`/products/${result.data.product.slug}`);
        }
      })
      .catch((err) => {
        toast.error("Failed! Please try again!");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let input = document.getElementById("input-add-image");
    let button = document.getElementById("button-add-image");
    const inputClick = function () {
      if (input) {
        return input.click();
      }
    };
    if (input && button) {
      button.addEventListener("click", inputClick);
      return function clear() {
        button.removeEventListener("click", inputClick);
      };
    }

    return () => {
      if (!isEmpty(file)) {
        URL.revokeObjectURL(file);
      }
    };
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <Box pad="3em 0" align="center">
      <Card height="auto" width="75%" background="light-1">
        <CardHeader pad="medium" justify="center">
          <Box align="center" direction="column">
            {file && (
              <div style={{ textAlign: "center" }} className="image-upload">
                <Image alt="fake src" src={file} height={500} />
              </div>
            )}
            <Heading
              color="#ff5f6d"
              level="3"
              style={{ textTransform: "uppercase" }}
            >
              Edit product
            </Heading>
          </Box>
        </CardHeader>
        <CardBody pad="medium">
          <Box align="center">
            <Form
              style={{ width: "100%" }}
              onReset={() => console.log(123)}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                name="title"
                label={<span style={{ color: "#ff5f6d" }}>Title</span>}
              >
                <TextInput
                  {...register("title", { required: true })}
                  name="title"
                />
                {errors.title && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </FormField>
              <FormField
                name="description"
                label={<span style={{ color: "#ff5f6d" }}>Description</span>}
              >
                <TextInput
                  {...register("description", { required: true })}
                  name="description"
                />
                {errors.description && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </FormField>
              <Box direction="column">
                <Box direction="row" justify="between">
                  <Box width="50%">
                    <Controller
                      render={({ field }) => (
                        <CategoriesDropDown
                          onChange={field.onChange}
                          categories={categories}
                        />
                      )}
                      name="category"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                      }}
                    />
                  </Box>
                  {watch("category") ? (
                    <Box
                      width={isDesktopOrLaptop ? "40%" : "50%"}
                      align="center"
                      gap={isDesktopOrLaptop ? "1em" : ""}
                      direction={isDesktopOrLaptop ? "row" : "column"}
                    >
                      <Image
                        width="100"
                        height="100"
                        src={watch("category").imageUrl}
                      />
                      <Heading pad="0" margin="0" level="2">
                        {watch("category").name}
                      </Heading>
                    </Box>
                  ) : null}
                </Box>
                {errors.category && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Box>
              <Box
                pad="1em .5em"
                gap="1em"
                direction={isDesktopOrLaptop ? "row" : "column"}
              >
                <Button
                  type="button"
                  id="button-add-image"
                  label="Add cover image"
                  color="green"
                />

                <input
                  id="input-add-image"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => {
                    if (e.target.value && e.target.files.length > 0) {
                      if (isValidFileImage(e.target.value, setErrorFile)) {
                        setImage(e.target.files[0]);
                        setFile((preFile) => {
                          if (!isEmpty(preFile)) {
                            URL.revokeObjectURL(preFile);
                          }
                          return URL.createObjectURL(e.target.files[0]);
                        });
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  color="green"
                  onClick={() => {
                    if (!isEmpty(file)) {
                      inputRef.current.value = "";
                      setFile((preFile) => {
                        URL.revokeObjectURL(preFile);
                        return null;
                      });
                    }
                  }}
                  disabled={isEmpty(file)}
                  label="Remove cover image"
                />
              </Box>
              <p style={{ color: "red" }}>{errorFile}</p>
              <FormField>
                <CkEditorComponent
                  onChange={(data) => {
                    setContent(data);
                  }}
                  data={content}
                  editorLoaded={editorLoaded}
                />
              </FormField>
              <Box
                pad="1em .5em"
                direction={isDesktopOrLaptop ? "row" : "column"}
                gap="medium"
              >
                <Button
                  type="button"
                  label="Preview"
                  color="green"
                  onClick={() => setOpenPreview(true)}
                />
                <Button
                  disabled={disableUpdate || loading}
                  type="submit"
                  color="#ff5f6d"
                  label={loading ? <Spinner /> : "Update"}
                />
              </Box>
            </Form>
            <PostPreview
              content={parse(content)}
              open={openPreview}
              setOpen={setOpenPreview}
            />
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
});
