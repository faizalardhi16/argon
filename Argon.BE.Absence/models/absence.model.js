import { UUIDV4, Model } from "sequelize";

export const Absence = (sequelize, Sequelize) => {
  class absence extends Model {
    // static associate(models) {
    //   absence.belongsTo(models.users);
    // }
  }

  absence.init(
    {
      id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      clockIn: Sequelize.DATE,
      clockOut: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      userId: {
        type: Sequelize.STRING(36),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "absences",
    }
  );

  return absence;
};
