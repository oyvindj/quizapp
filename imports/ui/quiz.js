import { Template } from 'meteor/templating';
 
import { Quizes } from '../api/quizes.js';
 
import './quiz.html';

Template.quiz.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.quiz.events({
  'click .toggle-checked'() {
  	Meteor.call('quizes.setChecked', this._id, !this.checked);
  },

  'click .delete'() {
    Meteor.call('quizes.remove', this._id);
  },

  'click .toggle-private'() {
    Meteor.call('quizes.setPrivate', this._id, !this.private);
  },
});
