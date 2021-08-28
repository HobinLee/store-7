export type URIParameterType = {
  [key: string]: string;
};

export const encodeParams = (params: URIParameterType): string => {
  const encoded = [];

  for (const param in params) {
    params.hasOwnProperty(param) &&
      encoded.push(
        encodeURIComponent(param) + "=" + encodeURIComponent(params[param])
      );
  }

  return encoded.join("&");
};

export const decodeParams = (
  encoded = window.location.search
): URIParameterType | null => {
  const params = {};

  const query = encoded.substring(1);
  const vars = query.split("&");

  vars.forEach((v) => {
    const pair = v.split("=");
    const key = decodeURIComponent(pair[0]);
    const value = pair[1] ? decodeURIComponent(pair[1]) : null;

    params[key] = value;
  });

  return params;
};
