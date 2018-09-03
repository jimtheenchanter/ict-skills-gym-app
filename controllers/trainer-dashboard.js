'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
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

        const viewData = {
            assessments: assessmentStore.getMemberAssessments(member.id),
            member: member,
            bmiCategory: bmiCalc.determineCategory(bmiCalc.calculateBmi(member,member.startingweight)),
            // bmi: bmiCalc.calculateBmi(loggedInMember.weight, loggedInMember.height),
            goals: goalStore.getMemberGoals(member.id),
            bmi: bmiCalc.calculateBmi(member,member.startingweight)
        };
        response.render('trainerviewuser',viewData);
    },

    addComment(request, response){

        //const assessment = assessmentStore.getAssessment(request.body.id);
        assessmentStore.addComment(request.body.id,request.body.comment);
        const member = memberStore.getMemberById(request.body.member);
        /*logger.info("member",request.body.member);
        const viewData = {
            assessments: assessmentStore.getMemberAssessments(member.id),
            member: member,
            };
        logger.info("member",viewData.assessments);
        response.render('trainerviewuser',viewData);
        // response.redirect('/trainerdash',viewData);*/
        const fakereq = {"params":{"id":member.id}}; //fake request to cut down on WET
        module.exports.showMember(fakereq,response);
    },

    addGoal(request, response) {
        //find out the current member
        const member = memberStore.getMemberById(request.body.member);
        // noinspection JSAnnotator
        const newGoal = {
            id: uuid(),
            member: member,
            memberid: member.id,
            targetdate: new Date(request.body.targetdate),
            desired: request.body.desired,
        };

        logger.debug('Creating a new Goal', newGoal);
        goalStore.addGoal(newGoal);
        const fakereq = {"params":{"id":member.id}};
        module.exports.showMember(fakereq,response);
    },

    deleteGoal(request, response) {
        const member = memberStore.getMemberById(request.params.memberid);
        logger.info("memberrrrrrrrrrrrrrrrrID",request.params.memberId);
        /*const goalId = request.params.id;
        logger.debug(`Deleting Goal ${goalId} from Goal ${goalId}`);*/
        goalStore.removeGoal(request.params.id);
        /*const viewData = {
            assessments: assessmentStore.getMemberAssessments(member.id),
            member: member,
            };*/
        const fakereq = {"params":{"id":request.params.memberid}};
        module.exports.showMember(fakereq,response);

    },

    addAssessment(request, response) {
        //find out the current member
        const member = memberStore.getMemberById(request.params.memberId);
        // noinspection JSAnnotator
        const assessment = request.body;
        assessment.id = uuid();
        assessment.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        assessment.memberid = request.params.memberId;

        logger.debug('Creating a new Assessment', assessment);
        assessmentStore.addAssessment(assessment);
        const fakereq = {"params":{"id":member.id}};
        module.exports.showMember(fakereq,response);
    },

};
module.exports = trainerDashboard;


// 'use strict';
//
// const logger = require('../utils/logger');
// const memberStore = require('../models/member-store');
// const uuid = require('uuid');
// const assessmentStore = require('../models/assessment-store');
// const goalStore = require('../models/goal-store');
// const bmiCalc = require('../utils/bmi-calc');
//
// //trainer dashboard object
// const trainerDashboard = {
//   index(request, response) {
//     logger.info('trainer dashboard rendering');
//       const viewData = {
//       title: 'Trainer View',
//       members: memberStore.getAllMembers(),
//           };
//     logger.info('about to render', memberStore.getAllMembers());
//     response.render('trainerdash', viewData);
//   },
//
//  deleteMember(request, response) {
//     const memberId = request.params.id;
//     assessmentStore.removeMemberAssessments(memberId);
//     logger.debug(`Deleting member${memberId}`);
//     memberStore.remove(memberId);
//     response.redirect('/trainerdash');
//   },
//
//  showMember(request,response){
//    const member = memberStore.getMemberById(request.params.id);
//     const viewData = {
//        assessments: assessmentStore.getMemberAssessments(member.id),
//        member: member,
//        bmiCategory: bmiCalc.determineCategory(bmiCalc.calculateBmi(member,member.startingweight)),
//        goals: goalStore.getMemberGoals(member.id),
//        bmi: bmiCalc.calculateBmi(member,member.startingweight)
//    };
//    logger.info("member",viewData.assessments);
//    response.render('trainerviewuser',viewData);
//  },
//
//     addComment(request, response){
//
//         //const assessment = assessmentStore.getAssessment(request.body.id);
//         assessmentStore.addComment(request.body.id,request.body.comment);
//         const member = memberStore.getMemberById(request.body.member);
//         logger.info("member",request.body.member);
//         const viewData = {
//             assessments: assessmentStore.getMemberAssessments(member.id),
//             member: member,
//             };
//         logger.info("member",viewData.assessments);
//         response.render('trainerviewuser',viewData);
//         // response.redirect('/trainerdash',viewData);
//     },
//
//   addGoal(request, response) {
//    //find out the current member
//       const member = memberStore.getMemberById(request.body.member);
//     // noinspection JSAnnotator
//       const newGoal = {
//       id: uuid(),
//       member: member,
//       memberid: memberStore.id,
//       targetdate: request.body.targetdate,
//       desired: request.body.desired,
//        };
//
//     logger.debug('Creating a new Goal', newGoal);
//     goalStore.addGoal(newGoal);
//     // response.render('trainerviewuser');
//       response.render('trainerdash');
//   },
//
//     deleteGoal(request, response) {
//         const goalId = request.params.id;
//         logger.debug(`Deleting Goal ${goalId} from Goal ${goalId}`);
//         goalStore.removeGoal(goalId);
//         response.render('trainerviewuser' );
//     },
//
// };
//   module.exports = trainerDashboard;
