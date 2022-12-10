const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RoomChat extends Model {}

  RoomChat.init(
    {
      message: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "RoomChat",
    }
  );

  RoomChat.associate = (models) => {
    RoomChat.belongsTo(models.Room, {
      foreignKey: 'roomId'
    });
    RoomChat.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return RoomChat;
};
