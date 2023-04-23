import axios from "axios";
import jwt from "jsonwebtoken";

import objectResponse from "../../Argon.BE.Library/helper/objectResponse.js";
import bcrypt from "bcrypt";
import { secret } from "../config/auth.config.js";

const loginService = async (input) => {
  try {
    const response = await axios.get(
      "http://localhost:4555/api/v1/users?email=" + input.email
    );

    const passwordValid = await bcrypt.compare(
      input.password,
      response.data.data.password
    );

    if (!passwordValid) {
      return objectResponse(404, "Password doesn't match", null, false);
    }

    var token = jwt.sign({ sub: response.data.data.id }, secret, {
      expiresIn: 86400, // 24 hours
    });

    return objectResponse(
      200,
      "Success to login",
      {
        id: response.data.data.id,
        email: response.data.data.email,
        accessToken: token,
      },
      true
    );
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const verifyTokenService = async (input) => {
  try {
    let header = input.authorization;

    if (!header) {
      return objectResponse(401, "Unauthorized!", null, false);
    }

    const token = header.split(" ")[1];

    const jwtResp = jwt.verify(token, secret);

    return objectResponse(
      200,
      "Token has been verified",
      { id: jwtResp.sub },
      true
    );
  } catch (error) {
    console.log(error);
    return objectResponse(500, error.message, null, false);
  }
};

const authService = {
  loginService,
  verifyTokenService,
};

export default authService;
