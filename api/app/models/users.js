module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again' },
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: { args: true, msg: 'Username is already in use' },
      allowNull: { args: false, msg: 'Username is required' },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    access_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('slack', 'regular'),
      validate: {
        isIn: {
          args: [['slack', 'regular']],
          msg: 'User type must be amazon or regular',
        },
      },
    },
  }, {});
  Users.associate = (models) => {
    Users.hasMany(models.Quizzes, { foreignKey: 'userId' });
  };
  return Users;
};
