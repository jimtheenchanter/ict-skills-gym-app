'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');


//dashboard object
const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Assessment',
      assessments: assessmentStore.getMemberAssessments(loggedInUser.id),
    };
    logger.info('about to render', assessmentStore.getAllAssessments());
    response.render('dashboard', viewData);
  },
};



  module.exports = dashboard;
