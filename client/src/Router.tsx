import { useEffect, ReactElement } from "react";
import styled from "styled-components";

import { decodeParams } from "./utils/location";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedCategoryState } from "./store/category";
import { locationState } from "./store/history";
import { loginState } from "./store/state";
import { routes } from "./App";

export type PageComponentType = () => JSX.Element;

export type RouteSetType = [string, PageComponentType, boolean?];

interface RouterType {
  exact?: boolean;
  path: string;
  component: () => JSX.Element;
}

interface HistoryEvent extends Event {
  detail: {
    pathname: string;
  };
}

const NOT_FOUND = "/404";

const checkPath = (
  targetPath: string,
  currPath: string,
  exact: boolean
): boolean => {
  if (exact) {
    return targetPath === currPath;
  } else {
    return currPath.match(new RegExp(targetPath, "i"))?.index === 0;
  }
};

export const Router = ({ children }): ReactElement => {
  const setLocation = useSetRecoilState(locationState);
  const isLoggedIn = useRecoilValue(loginState);
  const setSelectedCategoryState = useSetRecoilState(selectedCategoryState);

  const setCurrentCategory = () => {
    const params = decodeParams();

    setSelectedCategoryState({
      categoryId: params.category ? parseInt(params.category) : -1,
      subCategoryId: params.subCategory && parseInt(params.subCategory),
    });
  };

  const setCurrentLocation = () => {
    setLocation({
      location: window.location.pathname,
      params: decodeParams(),
    });

    document.documentElement.scrollTo(0, 0);
    setCurrentCategory();
  };

  const handlePushState = (e: HistoryEvent) => {
    const path = e.detail.pathname;
    window.history.pushState({}, "", path);
    setCurrentLocation();
  };

  const handlePopState = (e) => {
    setCurrentLocation();
  };

  const addEvents = () => {
    window.addEventListener("pushstate", handlePushState);
    window.addEventListener("popstate", handlePopState);
  };

  const checkPathValidation = () => {
    const exist = routes.find(([path, component, exact]: RouteSetType) =>
      checkPath(path, window.location.pathname, exact)
    );

    !exist && moveTo(NOT_FOUND);
  };

  useEffect(() => {
    addEvents();
    checkPathValidation();
  }, []);

  return isLoggedIn !== null && children;
};

export const Route = ({ exact, path, component: Component }: RouterType) => {
  const { location } = useRecoilValue(locationState);

  return checkPath(path, location, exact) ? <Component /> : null;
};

export const moveTo = (path: string) => {
  const routeEvent = new CustomEvent("pushstate", {
    detail: {
      pathname: path,
    },
  });

  window.dispatchEvent(routeEvent);
};

export const Link = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactChild | React.ReactChild[];
}) => {
  const handleClickLink = () => {
    moveTo(to);
  };

  return <LinkWrapper onClick={handleClickLink}>{children}</LinkWrapper>;
};

const LinkWrapper = styled.a`
  cursor: pointer;
`;
