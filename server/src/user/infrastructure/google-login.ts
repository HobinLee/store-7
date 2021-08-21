import properties from "@/config/properties/properties";
import axios from "axios";

export const getGoogleAccessToken = async (code: string) => {
  const params = {
    client_id: properties.google.id,
    client_secret: properties.google.secret,
    grant_type: "authorization_code",
    redirect_uri: properties.google.redirect,
    code,
  };

  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    params
  );

  return response?.data?.access_token ?? null;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const response = await axios(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
