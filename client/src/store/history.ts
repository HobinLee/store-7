import { decodeParams, URIParameterType } from "@/utils/location";
import { atom } from "recoil";

export const DEFAULT_LOCATION = "/";

export interface LocaitionStateType {
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
