import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
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
  TextInput,
} from "grommet";
import { useMediaQuery } from "react-responsive";
import { WrapContext } from "pages/_app";

export default function TachyonAdmin() {
  const { setIsTachyonAdmin, auth } = useContext(WrapContext);
  const { user } = auth;
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  async function onSubmit(data) {
    const { username, password } = data;
    if (username === "tachyon-107" && password === "12345@12345") {
      setIsTachyonAdmin(true);
      router.push("/tachyon-admin/private-login");
    }
  }

  return (
    <Box pad="3em 0" align="center">
      <Card height="auto" width="75%" background="light-1">
        <CardHeader pad="medium" justify="center">
          <Box align="center" direction="column">
            <Heading level="3" style={{ textTransform: "uppercase" }}>
              Authenticate System
            </Heading>
          </Box>
        </CardHeader>
        <CardBody pad="medium">
          <Box align="center">
            <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <FormField name="username" label="Username">
                <TextInput
                  {...register("username", { required: true })}
                  name="username"
                />
                {errors.username && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </FormField>
              <FormField name="password" label="Password">
                <TextInput
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                />
                {errors.password && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </FormField>
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
}
