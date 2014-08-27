'use strict';

function Task(o){
  this.name = o.name;
  this.description = o.description;
  this.difficulty = o.difficulty;
  this.rank = o.rank * 1;
  this.isComplete = false;
}
module.exports = Task;
