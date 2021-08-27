import { useEffect } from "react";
import MainPage from "@/Pages/Main";
import LoginPage from "@/Pages/Login";
import { Router, Route, RouteSetType } from "./Router";
import CategoryPage from "./Pages/Category";
import DetailPage from "./Pages/Detail";
import CartPage from "./Pages/Cart";
import MyPage from "./Pages/MyPage";
import OrderPage from "./Pages/Order";
import OrderResultPage from "./Pages/OrderResult";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global-style";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import SignupPage from "@/Pages/Signup";
import { useSetRecoilState } from "recoil";
import { loginState } from "./store/state";
import Alert from "./Components/Alert";
import { verifyToken } from "./api/auth";
import SearchPage from "./Pages/Search";
import AdminPage from "./Pages/Admin";
import WelcomePage from "./Pages/Welcome";
import NotFound from "./Pages/NotFound";

const routes: RouteSetType[] = [
  ["/", MainPage, true],
  ["/welcome", WelcomePage, true],
  ["/login", LoginPage, true],
  ["/signup", SignupPage],
  ["/category", CategoryPage],
  ["/order", OrderPage, true],
  ["/order", OrderResultPage],
  ["/detail", DetailPage],
  ["/cart", CartPage],
  ["/mypage", MyPage],
  ["/search", SearchPage],
  ["/admin", AdminPage],
  ["/404", NotFound, true],
];

const App = () => {
  const setIsLoggedin = useSetRecoilState(loginState);

  dayjs.locale("ko");

  const auth = async () => {
    try {
      await verifyToken();
      setIsLoggedin(true);
    } catch (e) {
      setIsLoggedin(false);
    }
  };

  const init = () => {
    auth();
  };

  useEffect(init, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Router>
        {routes.map(([path, component, exact]: RouteSetType) => (
          <Route
            path={path}
            exact={exact ?? false}
            key={path}
            component={component}
          />
        ))}
      </Router>
      <Alert />
    </ThemeProvider>
  );
};

export default App;
