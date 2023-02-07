require("dotenv").config();
const axios = require("axios");

const getGoogleOauthTokens = async (code) => {
  const url = process.env.GOOGLE_TOKEN_URI;

  const body = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const { data } = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return {
      data,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
    };
  }
};

module.exports = { getGoogleOauthTokens };
