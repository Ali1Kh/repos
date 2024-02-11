import { Token } from "../../DB/models/token.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new Error("Token Missing!"));
  const tokenDB = await Token.findOne({ token, isValid: true });
  if (!tokenDB) return next(new Error("Token Not Found!"));
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  req.payload = payload;
  return next();
});
