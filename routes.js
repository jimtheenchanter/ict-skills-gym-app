'use strict';

const express = require('express');
const router = express.Router();


const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const assessment = require('./controllers/assessment.js');
const goal = require('./controllers/goal.js');
const trainerdashboard = require('./controllers/trainer-dashboard.js');

router.get('/', accounts.index);
router.get('/signup', accounts.signup);
router.get('/login', accounts.login);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/settings', accounts.settings);
router.get('/dashboard', dashboard.index);
router.get('/trainerdash', trainerdashboard.index);


router.post('/dashboard/addassessment', dashboard.addAssessment);
router.post('/dashboard/addgoal', dashboard.addGoal);
router.get('/dashboard/deleteassessment/:id', dashboard.deleteAssessment);
router.get('/dashboard/deletegoal/:id', dashboard.deleteGoal);
router.get('/trainerdash/deletegoal/:id', trainerdashboard.deleteGoal);
router.post('/accounts/updateAccount', accounts.updateAccount);
router.get('/trainerdash/deleteMember/:id', trainerdashboard.deleteMember);
router.get('/trainerdash/:id', trainerdashboard.showMember);
router.post('/trainerdash/addcomment/', trainerdashboard.addComment);
router.post('/trainerdash/addassessment/:memberId', trainerdashboard.addAssessment);

router.get('/about', about.index);
router.get('/assessment/:id', assessment.index);
router.get('/goal/:id', goal.index);
router.post('/dashboard/addgoal/', dashboard.addGoal);
router.post('/trainerdash/addgoal/', trainerdashboard.addGoal);

module.exports = router;