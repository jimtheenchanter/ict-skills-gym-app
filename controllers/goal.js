'use strict';

const logger = require('../utils/logger');
const goalStore = require('../models/goal-store');
const uuid = require('uuid');

//assessment object made up of goalid and viewdata
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
  
  calculateBmi(request, response) {
    var weight = request.params.weight;
    var height = request.params.height ;
    if(weight > 0 && height > 0){	

    var finalBmi = weight/(height/100*height/100)
  }
  },
};

 

module.exports = goal;