'use strict';

const request = require('request');
const fs = require('fs');
const moment = require('moment')
const filePathPrefix = './data/';

function saveDataToJson(fileName, data, callback){
  fs.appendFile(fileName, data, function (err) {
    if (err){
      console.error(err);
      return callback(err);
    }
    console.log('Data written to file');
    return callback(null);
  });
}


function extractData(scriptName){
  var headers = {

  };

  var options = {
    url: '',
    json : true,
    headers: headers
  };

  var fileName = filePathPrefix + scriptName + '_' + new Date().getTime() + '.json';
  request(options, function(error, response, body){
    saveDataToJson(fileName, body, exitWithSuccess);
  });
}


function exitWithSuccess(){
  console.log('extraction completed! Exiting script now!');
  process.exit(0);
}

function  exitWithError(err){
  console.error('Something went wrong! Exiting script now!');
  console.error(err);
  process.exit(1);
}

extractData();
