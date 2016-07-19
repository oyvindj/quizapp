import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editanswer.html';
import './answerlist.js'

Template.editanswer.onCreated(function bodyOnCreated() {
});
 
Template.editanswer.helpers({
});

Template.editanswer.events({
	'click .finish'() {
    	Router.go('answerlist');
	},
});