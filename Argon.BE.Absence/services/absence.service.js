import db from "../models/index.js";
import Joi from "joi";
import sql from "../config/dbCon.js";

import objectResponse from "../../Argon.BE.Library/helper/objectResponse.js";

const Absence = db.absences;

const createAbsence = async (input, id) => {
  const { clockIn, clockOut } = input;
  const schema = Joi.object({
    clockIn: Joi.date().required(),
    clockOut: Joi.date().required(),
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
      select a.clockIn, a.clockOut, u.email from argon_db_absence.absences a
      join argon_db_users.users u on a.userId=u.id
    `);

    return objectResponse(200, "Success to load data", query[0][0], true);
  } catch (error) {
    return objectResponse(500, error.message, null, false);
  }
};

const absenceService = {
  createAbsence,
  getAbsence,
};

export default absenceService;
