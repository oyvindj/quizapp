import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Answers = new Mongo.Collection('answers');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('answers', function answersPublication() {
    return Answers.find();
  });
}
 
Meteor.methods({
  'answers.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a answer
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Answers.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'answers.remove'(answerId) {
    check(answerId, String);

    const answer = Answers.findOne(answerId);
    if (answer.owner !== this.userId) {
      // make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Answers.remove(answerId);
  },

  'answers.setChecked'(answerId, setChecked) {
    check(answerId, String);
    check(setChecked, Boolean);

    const answer = Answers.findOne(answerId);
    if (answer.owner !== this.userId) {
      // make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
 
    Answers.update(answerId, { $set: { checked: setChecked } });
  },

});
