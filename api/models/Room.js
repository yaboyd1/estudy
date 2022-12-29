'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {}

  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: [3, 20],
          notEmpty: true,
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numOfUsers: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );

  Room.associate = (models) => {
    Room.hasMany(models.User, {
      foreignKey: 'roomId',
    });
    Room.hasMany(models.RoomChat, {
      foreignKey: 'roomId',
    });
  };

  return Room;
};
