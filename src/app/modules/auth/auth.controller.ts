import { JwtPayload } from "jsonwebtoken";

import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.authRegisterInToDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Register Successfully",
    data: {
      accessToken: result,
    },
  });
});

const logingUser = catchAsync(async (req, res) => {
  const result = await AuthService.authLoginIntoDB(req.body);

  res.cookie("refeshToken", result.refeshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Successfully login",
    data: {
      accessToken: result.accessToken,
    },
  });
});
const refeshToken = catchAsync(async (req, res) => {
  const { refeshToken } = req.cookies;
  const result = await AuthService.refeshTokenInToForDb(refeshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "refesh token Successfully get the access",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  logingUser,
  refeshToken,
};
