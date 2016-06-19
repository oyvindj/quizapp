import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editquiz.html';
import './questionlist.js'

Template.editquiz.onCreated(function bodyOnCreated() {
});
 
Template.editquiz.helpers({
});

Template.editquiz.events({
	'click .finish'() {
    	Router.go('quizlist');
	},
});

Template.editquiz.rendered = function() {
    console.log(this.data); 
};