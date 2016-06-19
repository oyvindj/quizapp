import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import { Questions } from '../api/questions.js';
 
import './question.js';
import './questionlist.html';

Template.questionlist.onCreated(function bodyOnCreated() {
  console.log("subscribing...");
  this.state = new ReactiveDict();
  Meteor.subscribe('questions');
});
 
Template.questionlist.helpers({
  questions() {
    return Questions.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Questions.find({ checked: { $ne: true } }).count();
  },
});

Template.questionlist.events({
  'submit .new-question'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    Meteor.call('questions.insert', text);
  
    // Clear form
    target.text.value = '';
  },
  
});
