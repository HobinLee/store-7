import { alert } from "@/Components/Alert";
import { moveTo } from "@/Router";

export const enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  PRECONDITION_FAILED = 412,
}

interface ErrorResponse extends Response {
  data?: string;
}

interface HttpError extends Error {
  status: number;
  response: ErrorResponse;
}

export const handleHttpError = (error: HttpError) => {
  error.response.data && alert(error.response.data);

  switch (error.status) {
    case HttpStatus.UNAUTHORIZED:
    case HttpStatus.PRECONDITION_FAILED:
      moveTo("/login");
      break;
    default:
      break;
  }
  throw Error(error.response.data || error.message);
};
