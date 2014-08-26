/* jshint expr:true */
/* global describe, it, before */

'use strict';

var expect    = require('chai').expect,
    Goal    = require('../../app/models/goal'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo    = require('mongodb'),
    db        = 'life-coach-test';

describe('Goal', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  describe('.create', function(){
    it('should create a goal', function(done){
      var body = {name:'be a doctor', due:'2014-08-27', tags:'a, b, c, d'},
          userId = Mongo.ObjectID('000000000000000000000001');
      Goal.create(body, userId, function(err, goal){
        expect(goal).to.be.instanceof(Goal);
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.userId).to.be.instanceof(Mongo.ObjectID);
        expect(goal.name).to.equal('be a doctor');
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.tags).to.have.length(4);
        done();
      });
    });
  });
});
