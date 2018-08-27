'use strict';

const logger = require('../utils/logger');
const goalStore = require('../models/goal-store');
const uuid = require('uuid');

//goal object made up of goalid and viewdata
const goal = {
  index(request, response) {
    const goalId = request.params.id;
    logger.debug('Goalid = ', goalId);
    const viewData = {
      title: 'Goal',
      goal: goalStore.getGoal(goalId),
    };
    response.render('goal', viewData);
  },
  
  goalTrend(request, response)
  
  { }
 


  
};

 

module.exports = goal;