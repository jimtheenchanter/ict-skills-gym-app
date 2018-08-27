'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const memberStore = require('../models/member-store');
const goalStore = require('../models/goal-store');
const uuid = require('uuid');

const bmiCalc = require('../utils/bmi-calc');


//dashboard object
const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
   const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: 'Dashboard',
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
      member: memberStore.getMemberById(loggedInMember.id),
      bmiCategory: bmiCalc.determineCategory(bmiCalc.calculateBmi(loggedInMember,loggedInMember.startingweight)),
      goals: goalStore.getMemberGoals(loggedInMember.id),
      bmi: bmiCalc.calculateBmi(loggedInMember,loggedInMember.startingweight),
      isIdeal: bmiCalc.isIdealBodyWeight(loggedInMember, loggedInMember.startingweight),
      isMember:true
    };
    
    // logger.info("number please",viewData);
    logger.info('about to render', assessmentStore.getAllAssessments());
    logger.info('about to render', goalStore.getAllGoals());
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
    const newAssessment = {        // new assessment is made up of the following
      id: uuid(),
      memberid: loggedInMember.id,  //all assessments will have an ID of user
      weight: request.body.weight,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      chest: request.body.chest,
      waist: request.body.waist,
      hips: request.body.hips,
      date: new Date()
    };
    logger.debug('Creating a new Assessment', newAssessment);   //update dashboard
    assessmentStore.addAssessment(newAssessment);  //adds a new assessment to the store
    response.redirect('/dashboard');
  },
  
  
  deleteGoal(request, response) {
    const goalId = request.params.id;
    logger.debug(`Deleting Goal ${goalId} from Goal ${goalId}`);
    goalStore.removeGoal(goalId);
    response.redirect('/dashboard/' );
  },

  addGoal(request, response) {   //user requests to add goal - app responds with
    const loggedInMember = accounts.getCurrentMember(request); //find out the current member
    const newGoal = {   //creates a new goal with the following fields
      id: uuid(),
      memberid: loggedInMember.id,
      targetdate: request.body.targetdate,
      desired: request.body.desired,
        };
    logger.debug('New Goal = ', newGoal);
    goalStore.addGoal(newGoal);
    response.redirect('/dashboard/' );
  },
  

};
  module.exports = dashboard;
