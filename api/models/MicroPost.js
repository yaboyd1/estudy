'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MicroPost extends Model {}

  MicroPost.init(
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
      modelName: 'MicroPost',
    }
  );

  MicroPost.associate = (models) => {
    // associations can be defined here
    MicroPost.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return MicroPost;
};
