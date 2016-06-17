import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
 
import { Quizes } from '../api/quizes.js';
 
import './quiz.js';
import './quizlist.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('quizes');
});
 
Template.body.helpers({
  quizes() {
	const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Quizes.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }

    return Quizes.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Quizes.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    Meteor.call('quizes.insert', text);
  
    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
