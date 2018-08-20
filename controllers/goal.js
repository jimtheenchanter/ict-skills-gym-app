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
 
//   deleteGoal(request, response) {
   
//     const goalId = request.params.goalId;
//     logger.debug(`Deleting Goal ${goalId} from Goals ${goalId}`);
//     goalStore.removeGoal(goalId, goalId);
//     response.redirect('/goal/' + goalId);
//   },

//   addGoal(request, response) {
//     const goalId = request.params.goalId;
//     const goal = goalStore.getGoal(goalId);
//     const newGoal = {
//       id: uuid(),
//       current: request.body.current,
//       desired: request.body.desired,
//       bmi: Number(request.body.bmi),
//     };
//     logger.debug('New Goal = ', newGoal);
//     goalStore.addGoal(goalId, newGoal);
//     response.redirect('/goal/' + goalId);
//   },
  

  
};

 

module.exports = goal;