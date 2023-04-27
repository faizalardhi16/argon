import axios from "axios";
import apiResponse from "./apiResponse.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const headers = {
      Authorization: req.headers.authorization,
    };

    const response = await axios.post(
      "http://localhost:4545/api/v1/auth/verify",
      {},
      { headers }
    );

    req.id = response.data.data.id;

    next();
  } catch (error) {
    console.log(error.response);
    res.status(401).send(
      apiResponse({
        success: false,
        message: "Error on Middleware Login",
        data: null,
        status: 401,
      })
    );
  }
};
