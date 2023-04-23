import db from "../models/index.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import sql from "../config/dbCon.js";
import objectResponse from "../../Argon.BE.Library/helper/objectResponse.js";
import { renderQuery } from "../../Argon.BE.Library/helper/renderQuery.js";

const User = db.users;
const Profile = db.profiles;
const Op = db.Sequelize.Op;

const createUserService = async (input) => {
  const { email, password, role } = input;

  const schema = Joi.object({
    email: Joi.string().email().min(8).max(100).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
  });

  try {
    const { error } = schema.validate(input);
    const valid = error === undefined;

    if (!valid) {
      return objectResponse(400, error.details[0].message, null, false);
    }

    const findEmail = await User.findOne({ where: { email: email } });

    if (findEmail) {
      return objectResponse(500, "Email already registered", null, false);
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const uid = uuidv4();

    const user = new User({
      id: uid,
      email: email,
      password: encryptPassword,
    });

    const profiles = new Profile({
      firstName: null,
      lastName: null,
      address: null,
      role: role.toUpperCase(),
      userId: uid,
      phone: null,
    });

    await user.save(user);
    await profiles.save(profiles);

    return objectResponse(
      200,
      "Success To create data",
      {
        id: uid,
        email: email,
        password: password,
      },
      true
    );
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const getUserByEmailService = async (input) => {
  const { email } = input;
  try {
    if (!email) {
      return objectResponse(400, "Please Insert the email", null, false);
    }

    const result = await sql.promise().query(
      `select u.email, u.password, u.id from users u join profiles p on u.id = p.userId
        where u.email='${email}'`
    );

    const response = result[0];

    if (response.length < 1) {
      return objectResponse(404, "User Not found", null, false);
    }

    return objectResponse(200, "Success to load data", response[0], true);
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const getAllUserService = async (input) => {
  const { email, firstName } = input;
  try {
    const result = await sql.promise().query(
      `
        select u.email, p.firstName, p.lastName, p.role from users u 
        join profiles p on u.id = p.userId
        where u.email LIKE '%${renderQuery(
          email
        )}%' OR p.firstName LIKE '%${renderQuery(firstName)}%'
      `
    );

    const response = result[0];

    return objectResponse(
      200,
      "Success to load data",
      response.length > 0 ? response : [],
      true
    );
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const userService = {
  createUserService,
  getUserByEmailService,
  getAllUserService,
};

export default userService;
