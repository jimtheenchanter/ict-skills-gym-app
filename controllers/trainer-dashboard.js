'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
// const bmicalc = require('../utils/bmi-calc');
const trainerStore = require('../models/trainer-store');
const assessmentStore = require('../models/assessment-store');
const goalStore = require('../models/goal-store');
const bmiCalc = require('../utils/bmi-calc');

//trainer dashboard object
const trainerDashboard = {
  index(request, response) {
    logger.info('trainer dashboard rendering');
    const listAllMembers = memberStore.getAllMembers(request);

    const viewData = {
      title: 'Trainer View',
      members: memberStore.getAllMembers(),
          };

    logger.info('about to render', memberStore.getAllMembers());
    response.render('trainerdash', viewData);
  },


 deleteMember(request, response) {
    const memberId = request.params.id;
    assessmentStore.removeMemberAssessments(memberId);
    logger.debug(`Deleting member${memberId}`);
    memberStore.remove(memberId);
    response.redirect('/trainerdash');
  },

 showMember(request,response){
   const member = memberStore.getMemberById(request.params.id);
     logger.info("member....................",request.params);

   const viewData = {
       assessments: assessmentStore.getMemberAssessments(member.id),

       member: member,
       bmiCategory: bmiCalc.determineCategory(bmiCalc.calculateBmi(member,member.startingweight)),
       // bmi: bmiCalc.calculateBmi(loggedInMember.weight, loggedInMember.height),
       goals: goalStore.getMemberGoals(member.id),
       bmi: bmiCalc.calculateBmi(member,member.startingweight)
   };
   logger.info("member",viewData.assessments);
   response.render('trainerviewuser',viewData);
 },

    addComment(request, response){

        //const assessment = assessmentStore.getAssessment(request.body.id);
        assessmentStore.addComment(request.body.id,request.body.comment);
        const member = memberStore.getMemberById(request.body.member);
        logger.info("member",request.body.member);
        const viewData = {
            assessments: assessmentStore.getMemberAssessments(member.id),
            member: member,
            bmiCategory: bmiCalc.determineCategory(bmiCalc.calculateBmi(member,member.startingweight)),
            goals: goalStore.getMemberGoals(member.id),
            bmi: bmiCalc.calculateBmi(member,member.startingweight)
        };
        logger.info("member",viewData.assessments);
        response.render('trainerviewuser',viewData);
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
