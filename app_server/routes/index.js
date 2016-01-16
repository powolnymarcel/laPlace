var express = require('express');
var router = express.Router();
var ctrlPrincipal = require('../controlleurs/principal');



router.get('/', ctrlPrincipal.index);
module.exports = router;














































//   avec fn nommée
//		var homepageController = function (req, res) {
//			res.render('index', { title: 'Express' });
//		};
//		/* GET home page. */
//		router.get('/', homepageController);
//
//			PAREIL ci dessous:
//			mais avec fn anonyme
//		/* GET home page. */
//		router.get('/', function(req, res, next) {
//		  res.render('index', { title: 'Express' });
//		});

//		module.exports = router;
