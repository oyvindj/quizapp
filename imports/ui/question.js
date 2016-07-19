import { Template } from 'meteor/templating';
 
import { Questions } from '../api/questions.js';
 
import './question.html';

Template.question.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.question.events({
  'click .toggle-checked'() {
  	Meteor.call('questions.setChecked', this._id, !this.checked);
  },

  'click .delete'() {
  	console.log('quiz id: ' + this._id)
    Meteor.call('questions.remove', this._id);
  },

});
