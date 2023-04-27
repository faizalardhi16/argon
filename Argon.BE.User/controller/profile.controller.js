import apiResponse from "../../Argon.BE.Library/helper/apiResponse.js";
import profileService from "../services/profile.service.js";

import multer from "multer";
const Profile = db.profiles;
import db from "../models/index.js";
import s3 from "../../Argon.BE.Library/helper/awsConfig.js";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const Update = async (req, res) => {
  try {
    const response = await profileService.updateProfileService(
      req.body,
      req.id
    );

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

const UploadAvatar = async (req, res) => {
  try {
    const file = req.file;
    const id = req.id;

    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    const params = {
      Bucket: "mygobucketzores",
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };

    await Profile.update(
      {
        avatar: `${Date.now()}-${file.originalname}`,
      },
      { where: { userId: id } }
    );

    s3.upload(params, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading file");
      }

      res.status(200).send({
        message: "success to upload file!",
      });
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file`,
    });
  }
};

const profileController = {
  Update,
  UploadAvatar,
};

export default profileController;
