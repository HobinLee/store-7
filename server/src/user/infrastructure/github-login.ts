import properties from "@/config/properties/properties";
import axios from "axios";

export const getGithubAccessToken = async (code: string) => {
  const url = `https://github.com/login/oauth/access_token`;

  const data = {
    client_id: properties.github.id,
    client_secret: properties.github.secret,
    code,
  };

  const response = await axios(url, { data });

  return getAccessToken(response.data);
};

const getAccessToken = (data: string) => {
  return data.split("&")[0].split("=")[1];
};

export const getGithubUserInfo = async (accessToken: string) => {
  const response = await axios("https://api.github.com/user", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  return response.data;
};
