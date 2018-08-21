'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const bmiCalc = require('../utils/bmi-calc');
//LET BMI CATEGORY = BMICALC.NAMEoFmETHOD(USERPARAMS);

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
  
   
 
  
  calculateBmi(request, response) {
    var weight = request.params.weight;
    var height = request.params.height ;
    if(weight > 0 && height > 0){	

    var finalBmi = weight/(height/100*height/100)
  }
  },
};

 

module.exports = assessment;