import React, { useState } from "react";
import MainPage from "@/Pages/Main";
import LoginPage from "@/Pages/Login";
import { ETRouter, ETRoute } from "./Router";
import CategoryPage from "./Pages/Category";
import DetailPage from "./Pages/Detail";
import CartPage from "./Pages/Cart";
import MyPage from "./Pages/MyPage";
import OrderPage from "./Pages/Order";
import CollectionPage from "./Pages/Collection";
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

      <ETRouter>
        <ETRoute path="/" exact>
          <MainPage />
        </ETRoute>
        <ETRoute path="/login" exact>
          <LoginPage />
        </ETRoute>
        <ETRoute path="/cart" exact>
          <CartPage />
        </ETRoute>
        <ETRoute path="/order" exact>
          <OrderPage />
        </ETRoute>
        <ETRoute path="/collection" exact>
          <CollectionPage />
        </ETRoute>
        <ETRoute path="/category">
          <CategoryPage />
        </ETRoute>
        <ETRoute path="/signup">
          <SignupPage />
        </ETRoute>
        <ETRoute path="/detail">
          <DetailPage />
        </ETRoute>
        <ETRoute path="/mypage">
          <MyPage />
        </ETRoute>
      </ETRouter>
    </ThemeProvider>
  );
};

export default App;
