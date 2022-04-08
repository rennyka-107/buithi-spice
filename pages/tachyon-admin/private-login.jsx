import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
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
import withTachyonAdminAuth from "hoc/withTachyonAdminAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthApi from "services/auth";
import { WrapContext } from "pages/_app";

function handleSchema(type = "login") {
  const typeLogin = {
    email: yup
      .string()
      .email("Email is not valid!")
      .required("Email is required!"),
    password: yup.string().required("Password is required!"),
  };
  const typeRegister = {
    ...typeLogin,
    name: yup.string().required("Username is required!"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Confim password must match with password"
      ),
  };
  const typeCode = {
    code: yup.string().min(4).max(4).required("Code verify is required!"),
  };
  switch (type) {
    case "login":
      return yup.object().shape(typeLogin);
    case "register":
      return yup.object().shape(typeRegister);
    case "code":
      return yup.object().shape(typeCode);
    default:
      return null;
  }
}

export default withTachyonAdminAuth(function PrivateLogin() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  const [forgotUserId, setForgotUserId] = useState();
  const [signUp, setSignUp] = useState(false);
  const [flagRegister, setFlagRegister] = useState(false);
  const [open, setOpen] = useState({ status: false, loading: false });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      handleSchema(flagRegister ? "code" : !signUp ? "login" : "register")
    ),
  });
  const { setAuth } = useContext(WrapContext);
  const router = useRouter();

  useEffect(() => {
    if (!open.status) {
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: "",
      });
      setSignUp(false);
      setFlagRegister(false);
      setForgotUserId();
    }
  }, [open.status, reset]);

  const getCodeForgotPassword = () => {
    if (watch("email")) {
      setOpen({ status: true, loading: true });
      AuthApi.getVerifyCode({ flagRegister: false, email: watch("email") })
        .then((res) => {
          if (res.data && res.data.status) {
            setForgotUserId(res.data.userId);
            setFlagRegister(true);
            setOpen({ status: true, loading: false });
            toast.success(res.data.message);
          } else {
            toast.error("Failed! Please try again!");
            setForgotUserId();
            setOpen({ status: false, loading: false });
          }
        })
        .catch((err) => {
          toast.error("Failed! Please try again!");
          setOpen({ status: false, loading: false });
        });
    } else {
      toast.error("You need fill your email to be continued");
    }
  };

  const onSubmit = (data) => {
    setOpen({ status: true, loading: true });
    if (!signUp) {
      if (flagRegister) {
        AuthApi.resetPasswordWithCode({ code: data.code, userId: forgotUserId })
          .then((res) => {
            if (res.data && res.data.status) {
              toast.success(res.data.message);
              setOpen({ status: true, loading: false });
              setForgotUserId();
              setFlagRegister(false);
              reset({
                name: "",
                email: watch("email"),
                password: "",
                confirmPassword: "",
                code: "",
              });
            } else {
              toast.error("Failed! Please try again!");
              setOpen({ status: false, loading: false });
            }
          })
          .catch((err) => {
            toast.error("Failed! Please try again!");
            setOpen({ status: false, loading: false });
          });
      } else {
        AuthApi.getCsrfCookie()
          .then((res) => {
            AuthApi.login(data)
              .then((res) => {
                if (res.data && res.data.status) {
                  const { user, accessToken } = res.data;
                  setAuth({ user, accessToken });
                  setOpen({ status: false, loading: false });
                  toast.success("Welcome! Login successfully!");
                  router.push("/");
                }
                if (res.data && !res.data.status) {
                  toast.error(
                    "Login error! Email or password not correct! Please try again!"
                  );
                  setOpen({ status: true, loading: false });
                }
              })
              .catch((err) => {
                toast.error("Login error! Please try again!");
                setOpen({ status: false, loading: false });
              });
          })
          .catch((err) => toast.error("Login error! Please try again!"));
      }
    } else {
      const { name, email, password, code } = data;
      if (flagRegister) {
        AuthApi.register({ name, email, password, code })
          .then((res) => {
            if (res.data && res.data.status) {
              toast.success(
                "Register successfully!. Please use your new account to login"
              );
              setOpen({ status: true, loading: false });
              setSignUp(false);
              setFlagRegister(false);
              reset({
                name: "",
                email: email,
                password: password,
                confirmPassword: "",
              });
            } else {
              toast.error("Failed! Please try again!");
              setOpen({ status: false, loading: false });
            }
          })
          .catch((err) => {
            toast.error("Failed! Please try again!");
            setOpen({ status: false, loading: false });
          });
      } else {
        AuthApi.getVerifyCode({ flagRegister: true, email })
          .then((res) => {
            if (res.data && res.data.status) {
              setFlagRegister(true);
              setOpen({ status: true, loading: false });
              toast.success(res.data.message);
              reset({
                name: name,
                email: email,
                password: password,
                confirmPassword: password,
              });
            } else {
              toast.error("Failed! Please try again!");
              setOpen({ status: false, loading: false });
            }
          })
          .catch((err) => {
            toast.error("Failed! Please try again!");
            setOpen({ status: false, loading: false });
          });
      }
    }
  };

  return (
    <Box pad="3em 0" align="center">
      <Card height="auto" width="75%" background="light-1">
        <CardHeader pad="medium" justify="center">
          <Box align="center" direction="column">
            <Heading level="3" style={{ textTransform: "uppercase" }}>
              Private{" "}
              {signUp
                ? "Register"
                : flagRegister
                ? "Reset forgot password"
                : "Login"}{" "}
              System
            </Heading>
          </Box>
        </CardHeader>
        <CardBody pad="medium">
          <Box align="center">
            <Form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              {flagRegister ? (
                <FormField name="code" label="Verify code">
                  <TextInput
                    {...register("code", { required: true })}
                    name="code"
                  />
                  {errors.code && (
                    <span style={{ color: "red" }}>This field is required</span>
                  )}
                </FormField>
              ) : (
                <>
                  {signUp && (
                    <FormField name="username" label="Username">
                      <TextInput
                        {...register("username", { required: true })}
                        name="username"
                      />
                      {errors.username && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </FormField>
                  )}
                  <FormField name="email" label="Email">
                    <TextInput
                      {...register("email", { required: true })}
                      name="email"
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </FormField>
                  <FormField name="password" label="Password">
                    <TextInput
                      {...register("password", { required: true })}
                      name="password"
                      type="password"
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </FormField>
                  {signUp && (
                    <FormField name="confirmPassword" label="Confirm password">
                      <TextInput
                        {...register("confirmPassword", { required: true })}
                        name="confirmPassword"
                        type="confirmPassword"
                      />
                      {errors.confirmPassword && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </FormField>
                  )}
                  <Box direction="row" gap="1em">
                    {!signUp && !flagRegister && (
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          textAlign: "left",
                          cursor: "pointer",
                          margin: "0 .7em",
                        }}
                        onClick={getCodeForgotPassword}
                      >
                        Forgot password?
                      </span>
                    )}
                    {!flagRegister && (
                      <span
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          textAlign: "left",
                          cursor: "pointer",
                          margin: "0 .7em",
                        }}
                        onClick={() => setSignUp(!signUp)}
                      >
                        {signUp ? " Sign in" : " Sign up"}
                      </span>
                    )}
                  </Box>
                </>
              )}
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
