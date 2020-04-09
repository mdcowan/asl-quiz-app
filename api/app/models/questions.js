module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define('Questions', {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      validate: {
        isUUID: { args: 4, msg: 'Id not valid, please try again.' },
      },
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: { args: [10, 500], msg: 'Question title is required to be at least 10 characters' },
      },
    },
    quizId: {
      type: DataTypes.UUID,
    },
  }, {});
  Questions.associate = (models) => {
    Questions.hasMany(models.Choices, { foreignKey: 'questionId' });
    Questions.belongsTo(models.Quizzes, { foreignKey: 'quizId' });
  };
  return Questions;
};
