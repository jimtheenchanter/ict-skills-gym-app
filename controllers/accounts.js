'use strict';

const memberstore = require('../models/member-store'); //uses the member-store for
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) { //method to render pages
    const viewData = {
      title: 'Login or Sign up',
    };
    response.render('index', viewData);
  },

  login(request, response) { //login method
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {  //logout method
    response.cookie('gym', '');
    response.redirect('/');
  },

  signup(request, response) {   //signup method
    const viewData = {
      title: 'Sign up to The Gym',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid();
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie('gym', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.gym;
    return memberstore.getMemberByEmail(memberEmail);
  },
  
  settings(request, response){
}
};
  

module.exports = accounts;