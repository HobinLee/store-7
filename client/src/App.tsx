import { useState, useEffect } from "react";
import MainPage from "@/Pages/Main";
import LoginPage from "@/Pages/Login";
import { Router, Route } from "./Router";
import CategoryPage from "./Pages/Category";
import DetailPage from "./Pages/Detail";
import CartPage from "./Pages/Cart";
import MyPage from "./Pages/MyPage";
import OrderPage from "./Pages/Order";
import OrderSuccess from "./Pages/OrderSuccess";
import { light, dark } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global-style";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import SignupPage from "@/Pages/Signup";
import { useSetRecoilState } from "recoil";
import { loginState } from "./store/state";
import Alert from "./Components/Alert";
import { verifyToken } from "./api/auth";

type route = [string, JSX.Element, boolean?];

const routes: route[] = [
  ["/", <MainPage />, true],
  ["/login", <LoginPage />, true],
  ["/signup", <SignupPage />],
  ["/category", <CategoryPage />],
  ["/order", <OrderPage />, true],
  ["/order/success", <OrderSuccess />],
  ["/detail", <DetailPage />],
  ["/cart", <CartPage />],
  ["/mypage", <MyPage />],
];

const App = () => {
  const setLogined = useSetRecoilState(loginState);
  const [themeMode, setThemeMode] = useState("light");
  const theme = themeMode === "light" ? light : dark;
  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");

  dayjs.locale("ko");

  const auth = async () => {
    try {
      await verifyToken();
      setLogined(true);
    } catch (e) {
      setLogined(false);
    }
  };

  const init = () => {
    auth();
  };

  useEffect(init, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <button
        style={{ position: "fixed", left: 0, top: 0, zIndex: 100 }}
        onClick={toggleTheme}
      >
        toggle mode
      </button>

      <Router>
        {routes.map(([path, component, exact]: route) => (
          <Route path={path} exact={exact ?? false} key={path}>
            {component}
          </Route>
        ))}
      </Router>
      <Alert />
    </ThemeProvider>
  );
};

export default App;
