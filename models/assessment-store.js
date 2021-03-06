'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {

    store: new JsonStore('./models/assessment-store.json', {assessmentCollection: []}),
    collection: 'assessmentCollection',

    getAllAssessments() {
        return this.store.findAll(this.collection);
    },

    getAssessment(id) {
        return this.store.findOneBy(this.collection, {id: id});
    },

    getMemberAssessments(memberid) {    //retrieve all assessments belonging to a specific member
        return this.store.findBy(this.collection, {memberid: memberid});
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

    removeMemberAssessments(mId) {
        const assessments = this.store.findBy(this.collection, {
            memberid: mId
        });
        this.store.remove(this.collection, assessments);
        this.store.save();
    },

    addComment(id, comment) {
        const assessment = this.getAssessment(id);
        assessment.comment = comment;
        this.store.save();
    },

    removeAllAssessments() {
        this.store.removeAll(this.collection);
        this.store.save();
    },

    getLatestAssessment(memberId) { // to retrieve last assessment

        const assessArray = module.exports.getMemberAssessments(memberId);  //create an array  based on getmemberassessments
        assessArray.sort(function (a, b) {                           //and sort by date
            return new Date(b.date) - new Date(a.date);
        });

        return assessArray[0].weight;  //return the weight of the latest assessment
    },

    sortAssessments(memberId) {
        const assessArray = module.exports.getMemberAssessments(memberId);
        assessArray.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        return assessArray;    //return entire array
    }
};
module.exports = assessmentStore;
