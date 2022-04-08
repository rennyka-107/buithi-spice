import BasePageLoading from "components/BasePageLoading";
import { useRouter } from "next/router";
import { WrapContext } from "pages/_app";
import { useContext } from "react";

const withTachyonAdminAuth = (Component) => {
  const AuthTachyon = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { isTachyonAdmin, auth } = useContext(WrapContext);
    const router = useRouter();
    // If user is not logged in, return login component
    if (!isTachyonAdmin) {
      router.push("/");
      return <BasePageLoading />;
    }
    if(auth && auth.user) {
      router.push("/");
      return <BasePageLoading />;
    }
    // If user is logged in, return original component
    return <Component {...props} />;
  };

  return AuthTachyon;
};

export default withTachyonAdminAuth;
