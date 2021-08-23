import {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactElement,
} from "react";
import styled from "styled-components";
import { decodeParams, URIParameterType } from "./utils/location";

interface RouterContextPropsType {
  location: string;
  params?: URIParameterType;
}

type PageComponentProps = { location?: string; params?: URIParameterType };

export type PageComponentType = ({
  location,
  params,
}: PageComponentProps) => JSX.Element;

export type RouteSetType = [string, PageComponentType, boolean?];

interface RouterType {
  exact?: boolean;
  path: string;
  component: (props: PageComponentProps) => JSX.Element;
}

interface HistoryEvent extends Event {
  detail: {
    pathname: string;
  };
}

const DEFAULT_LOCATION = "/";

const RouterContext = createContext<RouterContextPropsType>({
  location: DEFAULT_LOCATION,
});

export const Router = ({ children }): ReactElement => {
  const [location, setLocation] = useState<RouterContextPropsType>({
    location: window.location.pathname,
    params: decodeParams(),
  });

  const setCurrentLocation = () =>
    setLocation({
      location: window.location.pathname,
      params: decodeParams(),
    });

  const handlePushState = (e: HistoryEvent) => {
    const path = e.detail.pathname;
    window.history.pushState({}, "", path);
    setCurrentLocation();
  };

  const addEvents = () => {
    window.addEventListener("pushstate", handlePushState);
    window.addEventListener("popstate", setCurrentLocation);
  };

  useEffect(() => {
    addEvents();
  }, []);

  return (
    <RouterContext.Provider value={{ ...location }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Route = ({ exact, path, component: Component }: RouterType) => {
  const { location, params } = useContext(RouterContext);

  const checkPath = (): boolean => {
    if (exact) {
      return path === location;
    } else {
      return location.match(new RegExp(path, "i"))?.index === 0;
    }
  };

  return checkPath() ? <Component location={location} params={params} /> : null;
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
