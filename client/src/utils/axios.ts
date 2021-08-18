import axios from "axios";

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
      baseURL: process.env.API_URL,
      withCredentials: true,
      params,
    };
    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      ((method === "post" || method === "patch") &&
        (await axios.post(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      {};
    return data;
  } catch (error) {
    return error;
  }
};

export const GET = (url: string, params?: {}) =>
  fetchWrap({ method: "get", url, params });

export const POST = (url: string, body?: {}) =>
  fetchWrap({ method: "post", url, body });

export const PATCH = (url: string, body?: {}) =>
  fetchWrap({ method: "patch", url, body });

export const DELETE = (url: string) => fetchWrap({ method: "delete", url });