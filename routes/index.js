/*

Author  : Sudarsan PS
Website : www.sudarsanps.com 
Description : This project will you convert the plaintext into multiple hashes and encryptions. This is a one stop solution for hashing 

*/

// Default packages thats has been installed 
var express = require('express');
var router = express.Router();


var sha1 = require('sha1'); // SHA-1 
var md5  = require('md5'); //MD5 
var forge = require('node-forge'); // it supports multiple type encryption

// User defined functions are written here
var userFunctions = require('./functions');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Crypto', csrfToken: req.csrfToken(), success  : req.flash('success',''),error: req.flash('error',''),md5 : null });
});


// User submission
router.post('/',function(req,res,next){

	var userTerm = userFunctions.santizeInput(req.body.userterm);
	// console.log("userTerm:"+userTerm);
	var saltKey = null;
	if(userTerm != null && userTerm != ""){

		saltKey = userFunctions.santizeInput(req.body.salt);

		if(saltKey == null || saltKey == ""){

			saltKey = 'Jyj56t9K9xHppue';

		}
		console.log("saltKey:"+saltKey);
		// Hashing process 
		var sha1Result  = sha1(userTerm);
		var md5Result = md5(userTerm);

		//SHA-256
		var sha256 = forge.md.sha256.create();
		sha256.update(userTerm);
		var sha256Result = sha256.digest().toHex();

		//SHA-384
		var sha384 = forge.md.sha384.create();
		sha384.update(userTerm);
		var sha384Result = sha384.digest().toHex();

		//SHA-384
		var sha512 = forge.md.sha512.create();
		sha512.update(userTerm);
		var sha512Result = sha512.digest().toHex();

		//HMAC
		var hmac = forge.hmac.create();
		hmac.start('sha1',saltKey);
		hmac.update(userTerm);
		var hmacResult = hmac.digest().toHex();

		req.flash('success', 'Result is given below');
		res.render('index', { 
						title: 'Crypto',
						userTerm : userTerm,
						saltKey  : saltKey,
						md5      : md5Result,
						sha1     : sha1Result,
						sha256   : sha256Result,
						sha384   : sha384Result,
						sha512   : sha512Result,
						hmac     : hmacResult ,
					 	csrfToken: req.csrfToken(),
					 	success  : req.flash('success',''),
					 	error: req.flash('error','')

		});
	} 
	else{
		req.flash('error', 'Term field is mandatory');
		
		res.render('index', { 
			title: 'Crypto',
			md5 : null,
			csrfToken: req.csrfToken(),
			success  : req.flash('success',''),
			error: req.flash('error','')
		});	
	}
});


module.exports = router;
