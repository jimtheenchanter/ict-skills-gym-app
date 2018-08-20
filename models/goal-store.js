'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const goalStore = {

  store: new JsonStore('./models/goal-store.json', { goalCollection: [] }),
  collection: 'goalCollection',

  getAllGoals() {
    return this.store.findAll(this.collection);
  },

  getGoal(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberGoals(memberid) {    //retrieve all goals belonging to a specific member
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  addGoal(goal) {
    this.store.add(this.collection, goal);
    this.store.save();
  },

  removeGoal(id) {
    const goal = this.getGoal(id);
    this.store.remove(this.collection, goal);
    this.store.save();
  },

  removeAllGoals() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addGoal(id, goal) {
    const goal = this.getGoal(id);
    goal.goals.push(goal);

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
