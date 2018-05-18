'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert 
    ('Reviews', {

    name_author: 'Judie Test1',
    category: 'Review',
    content: 'This is a test review for this new venue',
    rating_venue: 5,
    venue_id: 123,
    createdAt: Sequelize.DATE, 
    updatedAt: Sequelize.DATE,
  
  

    })

  
  }

};
