import { UUIDV4, Model } from "sequelize";

export const Profile = (sequelize, Sequelize) => {
  class profile extends Model {
    static associate(models) {
      profile.belongsTo(models.users);
    }
  }

  profile.init(
    {
      id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      firstName: Sequelize.STRING(100),
      lastName: Sequelize.STRING(100),
      address: Sequelize.STRING(100),
      role: Sequelize.STRING(100),
      phone: Sequelize.STRING(15),
      avatar: Sequelize.STRING(100),
    },
    {
      sequelize,
      modelName: "profiles",
    }
  );

  return profile;
};
