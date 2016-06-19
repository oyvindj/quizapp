import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editquestion.html';
//import './questionlist.js'

Template.editquestion.onCreated(function bodyOnCreated() {
});
 
Template.editquestion.helpers({
});

Template.editquestion.events({
	'click .finish'() {
    	//Router.go('quizlist');
	},
});