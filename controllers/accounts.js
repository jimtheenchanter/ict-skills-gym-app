'use strict';

const trainerstore = require('../models/trainer-store');
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
      // this.store.save();
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
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (member) {
      response.cookie('gym', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    }else if(trainer){
        response.cookie('gym', trainer.email);
        logger.info(`logging in ${trainer.email}`);
        response.redirect('/trainerdash');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.gym;
    return memberstore.getMemberByEmail(memberEmail);
  },

  settings(request, response){
    const memberEmail = request.cookies.gym;
    const member = memberstore.getMemberByEmail(memberEmail);
    logger.info("member",member);
    response.render("settings",member);
    },

  updateAccount(request,response){
    const upMember = request.body; //this will update the relevant member field with input from user
    const memberEmail = request.cookies.gym;
    const member = memberstore.getMemberByEmail(memberEmail);
    member.firstName = upMember.firstName == "" ? member.firstName: upMember.firstName;
    member.lastName = upMember.lastName == "" ? member.lastName: upMember.lastName;
    member.email =upMember.email =="" ? member.email: upMember.email;
    member.gender = upMember.gender ==""? member.gender: upMember.gender;
    member.height = upMember.height ==""? member.height: upMember.height;
    member.startingweight = upMember.startingweight == "" ? member.startingweight: upMember.startingweight;
    response.render('settings',member);
    }


};

module.exports = accounts;