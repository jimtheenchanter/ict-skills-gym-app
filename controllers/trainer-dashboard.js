'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const bmicalc = require('../utils/bmi-calc');


//dashboard object
const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const listAllMembers = memberStore.getAllMembers(request);
    const viewData = {
      title: 'Members',
      members: memberStore.getAllMembers(),
      
    };
    logger.info("number please",viewData);
    logger.info('about to render', memberStore.getAllMembers());
    response.render('trainer dashboard', viewData);
  },


 deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting member${memberId}`);
    memberStore.removeAssessment(memberId);
    response.redirect('/dashboard');
  },
  
  addGoals(request, response) {
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
    memberStore.addAssessment(newAssessment);
    response.redirect('/dashboard');
  },
  


};
  module.exports = trainerDashboard;
