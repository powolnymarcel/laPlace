var express = require('express');
var router = express.Router();
var ctrlEndroits = require('../controlleurs/endroits');
var ctrlAutres = require('../controlleurs/autres');


/* Locations pages */
router.get('/', ctrlEndroits.listingAccueil);
router.get('/endroit', ctrlEndroits.infoEndroit);
router.get('/endroit/commentaire/nouveau', ctrlEndroits.ajouterCommentaire);
/* Other pages */
router.get('/a-propos', ctrlAutres.aPropos);
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
