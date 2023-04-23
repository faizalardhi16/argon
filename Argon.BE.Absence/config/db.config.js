export const dbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123123",
  DB: "argon_db_absence",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
