import { alert } from "@/Components/Common/Alert";
import axios from "axios";
import properties from "@/config/properties";
import { handleHttpError } from "./error";

const fetchWrap = async ({
  method,
  url,
  params,
  body,
}: {
  method: "get" | "post" | "patch" | "delete";
  url: string;
  params?: {};
  body?: {};
}) => {
  try {
    const config = {
      baseURL: properties.baseURL,
      withCredentials: true,
      params,
    };
    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "patch" && (await axios.patch(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      {};
    !!data.message && alert(data.message);
    return data;
  } catch (error) {
    handleHttpError(error);
  }
};

export const GET = (url: string, params?: {}) =>
  fetchWrap({ method: "get", url, params });

export const POST = (url: string, body?: {}, params?: {}) =>
  fetchWrap({ method: "post", url, body });

export const PATCH = (url: string, body?: {}) =>
  fetchWrap({ method: "patch", url, body });

export const DELETE = (url: string) => fetchWrap({ method: "delete", url });
