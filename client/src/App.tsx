import { useState } from "react";
import MainPage from "@/Pages/Main";
import LoginPage from "@/Pages/Login";
import { Router, Route } from "./Router";
import CategoryPage from "./Pages/Category";
import DetailPage from "./Pages/Detail";
import CartPage from "./Pages/Cart";
import MyPage from "./Pages/MyPage";
import OrderPage from "./Pages/Order";
import { light, dark } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global-style";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import SignupPage from "./Pages/Signup";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const theme = themeMode === "light" ? light : dark;
  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");

  dayjs.locale("ko");

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
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/cart" exact>
          <CartPage />
        </Route>
        <Route path="/order" exact>
          <OrderPage />
        </Route>
        <Route path="/category">
          <CategoryPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/detail">
          <DetailPage />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
      </Router>
    </ThemeProvider>
  );
};

export default App;
