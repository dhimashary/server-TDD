'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Content cannot be empty"
        },
        notEmpty: {
          msg: "Content cannot be empty"
        },
        len: {
            args: [4,255],
            msg: "Content length must between 4 - 32"
       }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId cannot be empty"
        },
        notEmpty: {
          msg: "UserId cannot be empty"
        }
      }
    }
  }, {});
  Tweet.associate = function (models) {
    // associations can be defined here
  };
  return Tweet;
};