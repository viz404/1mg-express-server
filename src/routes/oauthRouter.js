const { Router } = require("express");
const { googleOauthHandler } = require("../controllers/oauthControllers");

const oauthRouter = Router();

oauthRouter.get("/google", googleOauthHandler);

module.exports = { oauthRouter };
