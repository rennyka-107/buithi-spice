import React, { useEffect, useRef, useState } from "react";
import { isValidFileImage } from "helpers/validate";
import {  useForm } from "react-hook-form";
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
  TextInput,
} from "grommet";
import { useMediaQuery } from "react-responsive";

export default withAuth(function CreateCategory() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [errorFile, setErrorFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  async function onSubmit(data) {
    setLoading(true);
    CategoryApi.createNewCategory({
      ...data,
      image,
    })
      .then((result) => {
        if (result.data) {
          router.push("/products");
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
            <Heading level="3" style={{ textTransform: "uppercase" }}>
              Create a new category
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
              <FormField name="name" label="Name">
                <TextInput
                  {...register("name", { required: true })}
                  name="name"
                />
                {errors.name && (
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
              <Box
                pad="1em .5em"
                direction={isDesktopOrLaptop ? "row" : "column"}
                gap="medium"
              >
                <Button type="submit" primary label="Submit" />
              </Box>
            </Form>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
});
