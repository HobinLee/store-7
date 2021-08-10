import React, { useState } from "react";
import { ETLink, ETRouter, ETRoute } from "./Router";
import MainPage from "@/Pages/Main";
import SignupPage from '@/Pages/Signup';
import LoginPage from '@/Pages/Login';
import CategoryPage from "./Pages/Category";
import DetailPage from "./Pages/Detail";
import CartPage from "./Pages/Cart";
import { light, dark } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global-style";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const theme = themeMode === "light" ? light : dark;
  const toggleTheme = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light");

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
          <Login />
        </ETRoute>
        <ETRoute path='/signin' exact={true}>
          <LoginPage />
        </ETRoute>
        <ETRoute path='/signup' exact={true}>
          <SignupPage />
        </ETRoute>
        <ETRoute path="/cart" exact>
          <CartPage />
        </ETRoute>
        <ETRoute path="/category">
          <CategoryPage />
        </ETRoute>
        <ETRoute path="/detail">
          <DetailPage />
        </ETRoute>
      </ETRouter>
    </ThemeProvider>
  );
};

function Navigator() {
  return (
    <>
      <ETLink to="/">home</ETLink>
      <ETLink to="login">login</ETLink>
      <ETLink to="about">about</ETLink>
    </>
  );
}

function Login() {
  return <h1>Login 페이지 입니다</h1>;
}

function About() {
  return <h1>About 페이지 입니다</h1>;
}

export default App;
