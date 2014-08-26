/* global describe, it, before, beforeEach */
'use strict';

process.env.DB   = 'life-coach-test';

var expect = require('chai').expect,
    cp     = require('child_process'),
    app    = require('../../app/index'),
    cookie = null,
    request = require('supertest');


describe('goals', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bob@bob.com')
      .send('password=1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /', function(){
    it('should fetch the homepage', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);//get request
        expect(res.text).to.include('Home');//html on '/'
        done();
      });
    });
  });
  describe('get /goals/new', function(){
    it('should show the new goals page', function(done){
      request(app)
      .get('/goals/new')
      .set('cookie', cookie)//attaches cookie to request
      .end(function(err, res){
        expect(res.status).to.equal(200);//get request
        expect(res.text).to.include('Name');//html on '/goals/new'
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
        done();
      });
    });
  });

  describe('post /goals', function(){
    it('should show all the goals', function(done){
      request(app)
      .post('/goals')
      .set('cookie', cookie)//attaches cookie to request
      .send('name=be+a+doctor&due=2014-08-27&tags=a%2C+b%2C+c%2C+d')
      .end(function(err, res){
        expect(res.status).to.equal(302);//get request
        done();
      });
    });
  });
});
