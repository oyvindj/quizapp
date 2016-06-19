import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Questions = new Mongo.Collection('questions');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('questions', function questionsPublication() {
    return Questions.find();
  });
}
 
Meteor.methods({
  'questions.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a question
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Questions.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'questions.remove'(questionId) {
    check(questionId, String);

    const question = Questions.findOne(questionId);
    if (question.owner !== this.userId) {
      // make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Questions.remove(questionId);
  },

  'questions.setChecked'(questionId, setChecked) {
    check(questionId, String);
    check(setChecked, Boolean);

    const question = Questions.findOne(questionId);
    if (question.owner !== this.userId) {
      // make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
 
    Questions.update(questionId, { $set: { checked: setChecked } });
  },

});
