'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MicroPostResponse extends Model {}

  MicroPostResponse.init(
    {
      content: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 250],
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'MicroPostResponse',
    }
  );

  MicroPostResponse.associate = (models) => {
    // associations can be defined here
    MicroPostResponse.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    MicroPostResponse.belongsTo(models.MicroPost, {
      foreignKey: 'microPostId',
    });
  };

  return MicroPostResponse;
};
