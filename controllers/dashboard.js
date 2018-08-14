'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');


//dashboard object
const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Assessments',
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
    };
    logger.info('about to render', assessmentStore.getAllAssessments());
    response.render('dashboard', viewData);
  },


 deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');
  },
  
  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request); //find out the current member
    const newAssessment = {
      id: uuid(),
      memberid: loggedInMember.id,  //all assessments will have an ID of user
      weight: request.body.weight,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      chest: request.body.chest,
      waist: request.body.waist,
      hips: request.body.hips
       
    };
    logger.debug('Creating a new Assessment', newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },
  
  
  

};
  module.exports = dashboard;
