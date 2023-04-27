import apiResponse from "../../Argon.BE.Library/helper/apiResponse.js";
import userService from "../services/user.service.js";

export const Create = async (req, res) => {
  try {
    const response = await userService.createUserService(req.body);

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

export const GetByEmail = async (req, res) => {
  try {
    const response = await userService.getUserByEmailService(req.query);

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

export const GetAllUser = async (req, res) => {
  try {
    const response = await userService.getAllUserService(req.query);

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

export const GetByUserId = async (req, res) => {
  try {
    const response = await userService.getDetailUserId(req.id);

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

const userController = {
  Create,
  GetByEmail,
  GetAllUser,
  GetByUserId,
};

export default userController;
