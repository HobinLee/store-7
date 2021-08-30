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
import Alert from "./Components/Common/Alert";
import SearchPage from "./Pages/Search";
import AdminPage from "./Pages/Admin";
import WelcomePage from "./Pages/Welcome";
import NotFound from "./Pages/NotFound";
import LoginProvider from "./Components/LoginProvider";

export const routes: RouteSetType[] = [
  ["/", MainPage, true],
  ["/welcome", WelcomePage, true],
  ["/login", LoginPage, true],
  ["/signup", SignupPage],
  ["/category", CategoryPage],
  ["/order", OrderPage, true],
  ["/result", OrderResultPage],
  ["/detail", DetailPage],
  ["/cart", CartPage],
  ["/mypage", MyPage],
  ["/search", SearchPage],
  ["/admin", AdminPage],
  ["/404", NotFound, true],
];

const App = () => {
  dayjs.locale("ko");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LoginProvider>
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
      </LoginProvider>

      <Alert />
    </ThemeProvider>
  );
};

export default App;
