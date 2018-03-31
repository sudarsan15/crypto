/*

Author  : Sudarsan PS
Website : www.sudarsanps.com 
Description : This project will you convert the plaintext into multiple hashes and encryptions. This is a one stop solution for hashing 

*/

// Default packages thats has been installed 
var express = require('express');
var router = express.Router();

//==== Algorithm Section ========

var sha1 = require('sha1'); // SHA-1 
var md5  = require('md5'); //MD5 
var nodeForge = require('node-forge'); // it supports multiple type encryption

//======= Validation Section ======

var validator  = require('validator'); //package for common validations
var xss = require('xss');  // for prevention of XSS
var striptags = require('striptags');  // for stipping html tags from the input
var mongoSanitize = require('mongo-sanitize'); // sanitisatio of mongo related code


//Function for sanitizing user input
exports.santizeInput =  function santizeInput(userInput){
	if(userInput != ""){
		var santizedData =  validator.trim(mongoSanitize(xss(striptags(userInput))));
		return santizedData;
	}
	else{
		return null;
	}
}

