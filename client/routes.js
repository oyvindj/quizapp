import { Mongo } from 'meteor/mongo';

import '../imports/ui/body.js';
import '../imports/ui/quizlist.js';
import '../imports/ui/editquiz.js';
import '../imports/ui/questionlist.js';
import '../imports/ui/answerlist.js';
import '../imports/ui/editquestion.js';
import '../imports/ui/editanswer.js';
import { Quizes } from '../imports/api/quizes.js';
import { Questions } from '../imports/api/questions.js';
import { Answers } from '../imports/api/answers.js';
 
Router.configure({
    layoutTemplate: 'layout',
});

Router.route('/', {
    template: 'quizlist',
    name: 'quizlist'
});

Router.route('aboutus', {
    name: 'aboutus'
});

Router.route('quiz/:_id', {
    name: 'editquiz',
    template: 'editquiz',
    subscriptions: function() {
    	this.subscribe('quizes');
	},
    data: function(){
    	return Quizes.findOne({ _id: this.params._id });
    }
});

Router.route('question/:_id', {
    name: 'editquestion',
    template: 'editquestion',
    subscriptions: function() {
    	this.subscribe('questions');
	},
    data: function(){
    	return Questions.findOne({ _id: this.params._id });
    }
});

Router.route('answer/:_id', {
    name: 'editanswer',
    template: 'editanswer',
    subscriptions: function() {
    	this.subscribe('answers');
	},
    data: function(){
    	return Answers.findOne({ _id: this.params._id });
    }
});

Router.route('questionlist', {
    name: 'questionlist'
});

Router.route('answerlist', {
    name: 'answerlist'
});







