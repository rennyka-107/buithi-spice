import React, { useContext, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { isValidFileImage } from "helpers/validate";
import { Controller, useForm } from "react-hook-form";
import PostApi from "services/posts";
import { convertToSlug } from "helpers";
import { useRouter } from "next/router";
import { WrapContext } from "pages/_app";
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
  TextInput,
} from "grommet";
import CategoriesDropDown from "components/CategoriesDropDown";
import { useMediaQuery } from "react-responsive";
import CkEditorComponent from "components/CkEditorComponent";
import PostPreview from "components/PostPreview";

export default withAuth(function CreatePost() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorFile, setErrorFile] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const { auth } = useContext(WrapContext);
  const { user } = auth;
  const [categories, setCategories] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const inputRef = useRef(null);

  async function onSubmit(data) {
    console.log(data, image, content, "data here");
    // setLoading(true);
    // PostApi.createNewPost({
    //   userId: user?.id,
    //   slug: convertToSlug(data.title),
    //   ...data,
    //   category_id: data?.category?.id,
    //   image,
    //   content,
    // })
    //   .then((result) => {
    //     if (result.data && result.data.post) {
    //       router.push(`${result.data.post.id}`);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Failed! Please try again!");
    //   })
    //   .finally(() => setLoading(false));
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
    CategoryApi.getAllCategories({
      page: 1,
      size: 5,
    })
      .then((res) => {
        if (res.data && res.data.status) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => console.log(err));
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
            <Heading level="3" style={{ textTransform: "uppercase" }}>
              Write a new post
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
              <FormField name="title" label="Title">
                <TextInput
                  {...register("title", { required: true })}
                  name="title"
                />
                {errors.title && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </FormField>
              <FormField name="description" label="Description">
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
                pad="1em .5em 0 .5em"
                gap="1em"
                direction={isDesktopOrLaptop ? "row" : "column"}
              >
                <Button
                  type="button"
                  id="button-add-image"
                  label="Add cover image"
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
                  onClick={() => {
                    setOpenPreview(true);
                  }}
                />
                <Button type="submit" primary label="Submit" />
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
