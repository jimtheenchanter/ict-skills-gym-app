'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const bmiCalc = require('../utils/bmi-calc');


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
  
   


};

module.exports = assessment;