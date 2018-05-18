module.exports = function (sequelize, DataTypes) {
    
    var Review = sequelize.define('Review', {

      name_author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 3,
            msg: 'Name must be atleast 3 characters in length'
          }
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      rating_venue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      },
      venue_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

    });

    //add moment.js later

    return Review;
};
