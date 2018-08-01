'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');

//assessment object made up of assessmentid and viewdata
const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.debug('Assessment id = ', assessmentId);
    const viewData = {
      title: 'Assessment',
      assessment: assessmentStore.getAssessment(assessmentId),
    };
    response.render('assessment', viewData);
  },
  
  
 
  deleteGoal(request, response) {
    const assessmentId = request.params.id;
    const goalId = request.params.goalid;
    logger.debug(`Deleting Goal ${goalId} from Assessment ${assessmentId}`);
    assessmentStore.removeGoal(assessmentId, goalId);
    response.redirect('/assessment/' + assessmentId);
  },

  addGoal(request, response) {
    const assessmentId = request.params.id;
    const assessment = assessmentStore.getAssessment(assessmentId);
    const newGoal = {
      id: uuid(),
      current: request.body.current,
      desired: request.body.desired,
      bmi: Number(request.body.bmi),
    };
    logger.debug('New Goal = ', newGoal);
    assessmentStore.addGoal(assessmentId, newGoal);
    response.redirect('/assessment/' + assessmentId);
  },
};

 

module.exports = assessment;