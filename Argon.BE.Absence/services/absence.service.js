import db from "../models/index.js";
import Joi from "joi";
import sql from "../config/dbCon.js";

import objectResponse from "../../Argon.BE.Library/helper/objectResponse.js";

const Absence = db.absences;

const createAbsence = async (input, id) => {
  const { clockIn, clockOut } = input;

  const schema = Joi.object({
    clockIn: Joi.date().required(),
    clockOut: Joi.date().optional(),
  });

  try {
    const { error } = schema.validate(input);
    const valid = error === undefined;

    if (!valid) {
      return objectResponse(400, error.details[0].message, null, false);
    }

    const absence = new Absence({
      clockIn: clockIn,
      clockOut: clockOut,
      userId: id,
    });

    await absence.save(absence);

    return objectResponse(
      200,
      "Successfully to create absence",
      {
        clockIn,
        clockOut,
        userId: id,
      },
      true
    );
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const getAbsence = async () => {
  try {
    const query = await sql.promise().query(`
      select clockIn, clockOut, email, firstName, lastName, a.id from argon_db_absence.absences a 
      join argon_db_users.users u on a.userId = u.id
      join argon_db_users.profiles p on u.id = p.userId
      order by a.createdAt desc
    `);

    return objectResponse(200, "Success to load data", query[0], true);
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const getAbsenceDetail = async (id) => {
  try {
    const query = await sql.promise().query(`
      select clockIn, clockOut, email, firstName, lastName, a.id from argon_db_absence.absences a 
      join argon_db_users.users u on a.userId = u.id
      join argon_db_users.profiles p on u.id = p.userId
      where a.id = '${id}'
    `);

    return objectResponse(200, "Success to load data", query[0][0], true);
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const editAbsence = async (id, input) => {
  const { clockIn, clockOut } = input;

  const schema = Joi.object({
    clockIn: Joi.date().required(),
    clockOut: Joi.date().optional(),
  });

  console.log(input);

  try {
    const { error } = schema.validate(input);
    const valid = error === undefined;

    if (!valid) {
      return objectResponse(400, error.details[0].message, null, false);
    }

    await Absence.update(
      {
        clockIn,
        clockOut,
      },
      { where: { id: id } }
    );

    const query = await sql.promise().query(`
      select clockIn, clockOut, email, firstName, lastName, a.id from argon_db_absence.absences a 
      join argon_db_users.users u on a.userId = u.id
      join argon_db_users.profiles p on u.id = p.userId
      where a.id = '${id}'
    `);

    return objectResponse(200, "Success to update", query[0][0], true);
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const absenceService = {
  createAbsence,
  getAbsence,
  getAbsenceDetail,
  editAbsence,
};

export default absenceService;
