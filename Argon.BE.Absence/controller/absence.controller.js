import apiResponse from "../../Argon.BE.Library/helper/apiResponse.js";
import absenceService from "../services/absence.service.js";

const Create = async (req, res) => {
  try {
    const response = await absenceService.createAbsence(req.body, req.id);

    res.status(response.status).send(apiResponse(response));
  } catch (error) {
    res.status(500).send(500, error.message, null, false);
  }
};

const GetAllAbsence = async (req, res) => {
  try {
    const response = await absenceService.getAbsence();

    res.status(response.status).send(apiResponse(response));
  } catch (error) {
    console.log(error.message);
    res.status(500).send(500, error.message, null, false);
  }
};

const absenceController = {
  Create,
  GetAllAbsence,
};

export default absenceController;
