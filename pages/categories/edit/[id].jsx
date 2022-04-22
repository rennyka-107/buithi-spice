import React, { useEffect, useRef, useState } from "react";
import { isValidFileImage } from "helpers/validate";
import { useForm } from "react-hook-form";
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
import { useMediaQuery } from "react-responsive";

export default withAuth(function EditCategory() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const [loading, setLoading] = useState(false);
  const [errorFile, setErrorFile] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const [originValue, setOriginValue] = useState();
  const [disableUpdate, setDisableUpdate] = useState(true);

  useEffect(async () => {
    if (id) {
      try {
        const cateRes = await CategoryApi.getCategoryById(id);
        if (cateRes.data && cateRes.data.status) {
          const { category } = cateRes.data;
          setFile(category.imageUrl);
          setValue("name", category.name);
          setValue("description", category.description);
          setOriginValue({
            name: category.name,
            description: category.description,
            image: "",
          });
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed! Please try again!");
      }
    }
  }, [id]);

  useEffect(() => {
    if (
      originValue &&
      watch("name") &&
      watch("description")
    ) {
      const validName = originValue.name !== watch("name");
      const validDescription = originValue.description !== watch("description");
      const validImage = originValue.image !== image;
      if (
        validName||
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
  }, [originValue, watch("name"), watch("description"), image]);

  async function onSubmit(data) {
    setLoading(true);
    CategoryApi.updateCategory(id, {
      ...data,
      image,
      _method: "put",
    })
      .then((result) => {
        if (result.data && result.data.category) {
          router.push(`/admin`);
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
              Edit category
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
                name="name"
                label={<span style={{ color: "#ff5f6d" }}>Name</span>}
              >
                <TextInput
                  {...register("name", { required: true })}
                  name="name"
                />
                {errors.name && (
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
              <Box
                pad="1em .5em"
                direction={isDesktopOrLaptop ? "row" : "column"}
                gap="medium"
              >
                <Button
                  disabled={disableUpdate || loading}
                  type="submit"
                  color="#ff5f6d"
                  label={loading ? <Spinner /> : "Update"}
                />
              </Box>
            </Form>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
});
