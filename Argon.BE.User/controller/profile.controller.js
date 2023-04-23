import apiResponse from "../../Argon.BE.Library/helper/apiResponse.js";
import profileService from "../services/profile.service.js";

const Update = async (req, res) => {
  try {
    const response = await profileService.updateProfileService(req.body);

    res.status(response.status).send(apiResponse(response));
  } catch (error) {
    res.status(500).send(apiResponse(500, error.message, null, false));
  }
};

const profileController = {
  Update,
};

export default profileController;
