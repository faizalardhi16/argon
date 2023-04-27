import db from "../models/index.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import s3 from "../../Argon.BE.Library/helper/awsConfig.js";
import sql from "../config/dbCon.js";
import objectResponse from "../../Argon.BE.Library/helper/objectResponse.js";

const Profile = db.profiles;
const User = db.users;

const updateProfileService = async (input, id) => {
  const {
    password,
    currentPassword,
    firstName,
    lastName,
    address,
    phoneNumber,
    role,
  } = input;

  const schema = Joi.object({
    firstName: Joi.string().min(1).max(100).optional(),
    lastName: Joi.string().min(1).max(100).optional(),
    role: Joi.string().optional(),
    password: Joi.string().min(8).optional(),
    currentPassword: Joi.string().min(8).optional(),
    address: Joi.string().min(1).max(255).optional(),
    phoneNumber: Joi.optional(),
  });

  try {
    const { error } = schema.validate(input);
    const valid = error === undefined;

    if (!valid) {
      return objectResponse(400, error.details[0].message, null, false);
    }

    const result = await sql.promise().query(
      `
        select u.email, u.password, p.firstName, p.lastName, p.address, p.role from users u
        join profiles p on u.id = p.userId
        where u.id = '${id}'
      `
    );

    if (result[0].length < 1) {
      return objectResponse(404, "User Not Found", null, false);
    }

    if (password) {
      const matchPassword = await bcrypt.compare(
        currentPassword,
        result[0][0].password
      );

      if (!matchPassword) {
        return objectResponse(
          415,
          "The current password doesn't match.",
          null,
          false
        );
      } else {
        const encryptPassword = await bcrypt.hash(password, 10);

        await User.update(
          {
            password: encryptPassword,
          },
          { where: { id: id } }
        );
      }
    }

    await Profile.update(
      {
        firstName,
        lastName,
        role,
        address,
        phone: phoneNumber,
      },
      { where: { userId: id } }
    );

    const afterUpdate = await sql.promise().query(
      `
        select u.email, p.firstName, p.lastName, p.address, p.role, p.avatar from users u
        join profiles p on u.id = p.userId
        where userId = '${id}'
      `
    );

    let urlAws = "";

    if (afterUpdate[0][0] && afterUpdate[0][0].avatar) {
      const params = {
        Bucket: "mygobucketzores",
        Key: afterUpdate[0][0].avatar,
        Expires: 300, // URL expires in 5 minutes (300 seconds)
      };

      urlAws = await s3.getSignedUrl("getObject", params);
    }

    return objectResponse(
      200,
      "Success to update user",
      { ...afterUpdate[0][0], url: urlAws },
      true
    );
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const profileService = {
  updateProfileService,
};

export default profileService;
