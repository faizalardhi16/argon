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
    res.status(401).send(
      apiResponse({
        success: false,
        message: error.response.data.meta.message,
        data: null,
        status: 401,
      })
    );
  }
};
