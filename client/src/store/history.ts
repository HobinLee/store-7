import { Vector2D } from "@/shared/type";
import { decodeParams, URIParameterType } from "@/utils/location";
import { atom } from "recoil";

interface HistoryStateType {
  current: number;
  scrolls: Vector2D[];
}

export const DEFAULT_LOCATION = "/";
export const historyState = atom<HistoryStateType>({
  key: "history",
  default: {
    current: 0,
    scrolls: [],
  },
});

interface LocaitionStateType {
  location: string;
  params?: URIParameterType;
}

export const locationState = atom<LocaitionStateType>({
  key: "location",
  default: {
    location: window.location.pathname,
    params: decodeParams(),
  },
});
