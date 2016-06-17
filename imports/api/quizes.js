import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Quizes = new Mongo.Collection('quizes');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('quizes', function quizesPublication() {
    return Quizes.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
 
Meteor.methods({
  'quizes.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a quiz
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Quizes.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'quizes.remove'(quizId) {
    check(quizId, String);

    const quiz = Quizes.findOne(quizId);
    if (quiz.private && quiz.owner !== this.userId) {
      // If the quiz is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
 
    Quizes.remove(quizId);
  },

  'quizes.setChecked'(quizId, setChecked) {
    check(quizId, String);
    check(setChecked, Boolean);

    const quiz = Quizes.findOne(quizId);
    if (quiz.private && quiz.owner !== this.userId) {
      // If the quiz is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
 
    Quizes.update(quizId, { $set: { checked: setChecked } });
  },

  'quizes.setPrivate'(quizId, setToPrivate) {
    check(quizId, String);
    check(setToPrivate, Boolean);
 
    const quiz = Quizes.findOne(quizId);
 
    // Make sure only the quiz owner can make a quiz private
    if (quiz.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Quizes.update(quizId, { $set: { private: setToPrivate } });
  },
});
