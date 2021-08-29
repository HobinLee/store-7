import { verifyToken } from "@/api/auth";
import { loginState } from "@/store/state";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const LoginProvider = ({ children }) => {
  const setIsLoggedin = useSetRecoilState<boolean>(loginState);
  const auth = async () => {
    try {
      await verifyToken();
      setIsLoggedin(true);
    } catch (e) {
      setIsLoggedin(false);
    }
  };

  const handleTokenExpired = () => {
    setIsLoggedin(false);
  };

  const init = () => {
    auth();
    window.addEventListener("token-expired", handleTokenExpired);
  };

  useEffect(init, []);

  return <>{children}</>;
};

export default LoginProvider;
