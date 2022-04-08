import BasePageLoading from "components/BasePageLoading";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { WrapContext } from "pages/_app";
import { useContext } from "react";

const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { auth } = useContext(WrapContext);
    const { user } = auth;
    const router = useRouter();

    // If user is not logged in, return login component
    if (isEmpty(user)) {
      router.push("/");
      return <BasePageLoading />;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
