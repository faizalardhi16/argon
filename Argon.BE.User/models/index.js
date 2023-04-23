import { dbConfig } from "../config/db.config.js";
import Sequelize from "sequelize";
import { User } from "./users.model.js";
import { Profile } from "./profile.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  hose: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: true,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.users = User(sequelize, Sequelize);
db.profiles = Profile(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
