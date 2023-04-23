import axios from "axios";
import jwt from "jsonwebtoken";
import apiResponse from "../../Argon.BE.Library/helper/apiResponse.js";
import bcrypt from "bcrypt";
import { secret } from "../config/auth.config.js";
import authService from "../service/auth.service.js";

const Login = async (req, res) => {
  try {
    const response = await authService.loginService(req.body);

    res.status(response.status).send(apiResponse(response));
  } catch (error) {
    res.status(500).send(
      apiResponse({
        success: false,
        message: error.message,
        data: null,
        status: 500,
      })
    );
  }
};

const VerifyToken = async (req, res) => {
  try {
    const response = await authService.verifyTokenService(req.headers);

    res.status(response.status).send(apiResponse(response));
  } catch (error) {
    res.status(500).send(
      apiResponse({
        success: false,
        message: error.message,
        data: null,
        status: 500,
      })
    );
  }
};

const authController = {
  Login,
  VerifyToken,
};

export default authController;
