'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {

  store: new JsonStore('./models/assessment-store.json', { assessmentCollection: [] }),
  collection: 'assessmentCollection',

  getAllAssessments() {
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

  addGoal(id, weight) {
    const assessment = this.getAssessments(id);
    assessment.weights.push(weight);

    let bmi = 0;
    for (let i = 0; i < assessment.weight.length; i++) {
      bmi += assessment.weight[i].duration;
    }

    assessment.bmi= bmi;
    this.store.save();
  },

  removeGoal(id, weightId) {
    const assessment = this.getPlaylist(id);
    const goals = assessment.goals;
    _.remove(goals, { id: weightId});
    this.store.save();
  },
};

module.exports = assessmentStore;
