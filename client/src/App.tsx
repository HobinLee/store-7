import React from "react";
import MainPage from "@/Pages/Main";
import { ETLink, ETRouter, ETRoute } from "./Router";
import CategoryPage from "./Pages/Category";
import DetailPage from "./Pages/Detail";

const App = () => {
  return (
    <div>
      <ETRouter>
        <ETRoute path="/" exact>
          <MainPage />
        </ETRoute>
        <ETRoute path="/login" exact>
          <Login />
        </ETRoute>
        <ETRoute path="/about" exact>
          <About />
        </ETRoute>
        <ETRoute path="/category">
          <CategoryPage />
        </ETRoute>
        <ETRoute path="/detail">
          <DetailPage />
        </ETRoute>
      </ETRouter>
      <Navigator />
    </div>
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
