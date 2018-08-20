'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const goalStore = {

  store: new JsonStore('./models/assessment-store.json', { assessmentCollection: [] }),
  collection: 'assessmentCollection',

  getAllGOals() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberAssessments(memberid) {    //retrieve all assessments belonging to a specific member
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },

  removeAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addGoal(id, goal) {
    const assessment = this.getAssessment(id);
    assessment.goals.push(goal);

   //future date & BMI
    
    
    
    /* let bmi = 0;
    for (let i = 0; i < assessment.goal.length; i++) {
      bmi += assessment.goals[i].weight;
    }

    assessment.bmi= bmi;
    */
    this.store.save();
  },

  removeGoal(id, goalId) {
    const assessment = this.getAssessment(id);
    const goals = assessment.goals;
    _.remove(goals, { id: goalId});
    this.store.save();
  },
};

module.exports = goalStore;
