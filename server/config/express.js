var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, config){

    function compile(str,path){
        return stylus(str).set('filename',path);
    }
    app.set('views', config.rootPath+'/server/views');
    app.set('view engine','jade');
    app.use(logger('dev'));
    app.use(bodyParser());
    app.use(stylus.middleware(
        {
            src: config.rootPath+'/public',
            compile: compile
        }
    ));
    app.use(express.static(config.rootPath+ '/public'));
    
}