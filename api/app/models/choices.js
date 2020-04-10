module.exports = (sequelize, DataTypes) => {
  const Choices = sequelize.define('Choices', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again.' },
      },
    },
    value: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [3, 500], msg: 'Choice value is required to be at least 3 characters' },
      },
    },
    type: {
      type: DataTypes.ENUM('correct', 'incorrect'),
      validate: {
        isIn: {
          args: [['correct', 'incorrect']],
          msg: 'Choice must be correct or incorrect',
        },
      },
    },
    questionId: {
      type: DataTypes.UUID,
    },
  }, {});
  Choices.associate = (models) => {
    Choices.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };
  return Choices;
};
