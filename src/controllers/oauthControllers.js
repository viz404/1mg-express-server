const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../models/userModel");
const { getGoogleOauthTokens } = require("../service/userService");

const googleOauthHandler = async (req, res) => {
  try {
    const { code } = req.query;

    const { data, status } = await getGoogleOauthTokens(code);

    if (status == false) {
      throw new Error("failed to get token");
    }

    const { id_token } = data;

    const { name, email } = jwt.decode(id_token);

    const { _id } = await UserModel.findOneAndUpdate(
      { email },
      { name },
      { new: true, upsert: true }
    );

    const user_token = jwt.sign({ name, email, _id }, process.env.JWT_SECRET);

    res.cookie("onemg_session", user_token, { httpOnly: false });
    res.redirect(process.env.CLIENT_REDIRECT_URI);
  } catch (error) {
    console.log({ error });
    res.status(500);
    res.json({ message: "server error", status: false });
  }
};

module.exports = { googleOauthHandler };
