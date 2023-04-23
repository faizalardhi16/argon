import db from "../models/index.js";
import Joi from "joi";
import bcrypt from "bcrypt";

import sql from "../config/dbCon.js";
import objectResponse from "../../Argon.BE.Library/helper/objectResponse.js";

const Profile = db.profiles;
const User = db.users;

const updateProfileService = async (input) => {
  const {
    userId,
    password,
    currentPassword,
    firstName,
    lastName,
    address,
    phoneNumber,
    role,
  } = input;

  const schema = Joi.object({
    userId: Joi.string().length(36).required(),
    firstName: Joi.string().min(1).max(100).optional(),
    lastName: Joi.string().min(1).max(100).optional(),
    role: Joi.string().optional(),
    password: Joi.string().min(8).optional(),
    currentPassword: Joi.string().min(8).optional(),
    address: Joi.string().min(1).max(255).optional(),
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
        where u.id = '${userId}'
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
          { where: { id: userId } }
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
      { where: { userId: userId } }
    );

    const afterUpdate = await sql.promise().query(
      `
        select u.email, p.firstName, p.lastName, p.address, p.role from users u
        join profiles p on u.id = p.userId
        where userId = '${userId}'
      `
    );

    return objectResponse(
      200,
      "Success to update user",
      afterUpdate[0][0],
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
