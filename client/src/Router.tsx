import { useEffect, ReactElement } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { selectedCategoryState } from "./store/category";
import { locationState } from "@/store/history";
import { decodeParams } from "./utils/location";

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

export const Router = ({ children }): ReactElement => {
  const setLocation = useSetRecoilState(locationState);
  const setSelectedCategoryState = useSetRecoilState(selectedCategoryState);

  const setCurrentCategory = () => {
    const params = decodeParams();

    setSelectedCategoryState({
      categoryId: params.category ? parseInt(params.category) : 0,
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

  useEffect(() => {
    addEvents();
  }, []);

  return children;
};

export const Route = ({ exact, path, component: Component }: RouterType) => {
  const { location } = useRecoilValue(locationState);

  const checkPath = (): boolean => {
    if (exact) {
      return path === location;
    } else {
      return location.match(new RegExp(path, "i"))?.index === 0;
    }
  };

  return checkPath() ? <Component /> : null;
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
