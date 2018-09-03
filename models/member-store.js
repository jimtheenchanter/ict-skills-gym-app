//model to 

'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members',

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  addMember(member) {
    this.store.add(this.collection, member);
      this.store.save();

  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  getGender(gender) {
    return this.store.findBy(this.collection, {gender: gender})
  }  ,

  getHeight(height){
    return this.store.findBy(this.collection, {height: height});
  } ,

  getMemberByPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },

  remove(id) {
    const member = this.getMemberById(id);
    this.store.remove(this.collection, member);
    this.store.save();
    }
};

module.exports = memberStore;