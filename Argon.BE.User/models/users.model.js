import { UUIDV4, Model } from "sequelize";

export const User = (sequelize, Sequelize) => {
  class user extends Model {
    static associate(models) {
      user.hasOne(models.profiles);
    }
  }

  user.init(
    {
      id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      email: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  return user;
};
