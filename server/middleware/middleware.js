import axios from 'axios';

export const bkashToekn = async (req, res, next) => {
  globals.unset('id_token');

  try {
    const { data } = await axios.post(
      process.env.bkash_grant_token_url,
      {
        app_key: process.env.bkash_api_key,
        app_secret: process.env.bkash_secret_key,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          username: process.env.bkash_username,
          password: process.env.bkash_password,
        },
      }
    );

    req.headers.bkashToekn = data.id_token;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
