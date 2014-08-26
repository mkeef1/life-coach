'use strict';

function Goal(o, userId){
  this.name = o.name;
  this.due = new Date(o.due);
  this.tags = o.tags.split(',');
  this.userId = userId;
}

Object.defineProperty(Goal, 'collection', {
  get: function(){return global.mongodb.collection('goals');}
});

Goal.create = function(o, userId, cb){
  var goal = new Goal(o, userId);
  Goal.collection.save(goal, cb);
};

module.exports = Goal;

