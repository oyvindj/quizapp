import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import { Answers } from '../api/answers.js';
 
import './answer.js';
import './answerlist.html';

Template.answerlist.onCreated(function bodyOnCreated() {
  console.log("subscribing...");
  this.state = new ReactiveDict();
  Meteor.subscribe('answers');
});
 
Template.answerlist.helpers({
  answers() {
    return Answers.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Answers.find({ checked: { $ne: true } }).count();
  },
});

Template.answerlist.events({
  'submit .new-answer'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    Meteor.call('answers.insert', text);
  
    // Clear form
    target.text.value = '';
  },
  
});
