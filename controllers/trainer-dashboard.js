'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const bmicalc = require('../utils/bmi-calc');


//dashboard object
const trainerDashboard = {
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
  }
  
 
  


};
  module.exports = trainerDashboard;
