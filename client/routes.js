import '../imports/ui/body.js';
import '../imports/ui/quizlist.js';
import '../imports/ui/editquiz.js';
import '../imports/ui/questionlist.js';
import '../imports/ui/editquestion.js';

Router.configure({
    layoutTemplate: 'layout'
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
    data: function(){
    	console.log('this is a quiz page...');
    	console.log('id: ' + this.params._id);
    	//Quizes.findOne({ _id: this.params._id });
    }
});

Router.route('questionlist', {
    name: 'questionlist'
});

Router.route('editquestion', {
    name: 'editquestion'
});

outer.route('editquiz/:_id', {
    name: 'editquiz',
    data: function(){
    	console.log('this is a editquiz page...');
    	console.log('id: ' + this._id);
    	//Quizes.findOne({ _id: this.params._id });
    }
});




