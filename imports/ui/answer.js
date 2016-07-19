import { Template } from 'meteor/templating';
 
import { Answers } from '../api/answers.js';
 
import './answer.html';

Template.answer.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.answer.events({
  'click .toggle-checked'() {
  	Meteor.call('answers.setChecked', this._id, !this.checked);
  },

  'click .delete'() {
    Meteor.call('answers.remove', this._id);
  },

});
