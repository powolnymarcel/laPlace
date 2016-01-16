//Declaration d'express
var express = require('express');
//Declaration du routeur d'express
var router = express.Router();
//Declaration du controleurs en charges pour les endroits
var ctrlEndroits = require('../controlleurs/endroits');
//Declaration du controleurs en charges pour les autres pages
var ctrlAutres = require('../controlleurs/autres');



/**
 *
 * @description Routing pour les pages liées aux endroits
 *
 */
router.get('/', ctrlEndroits.listingAccueil);
router.get('/endroit', ctrlEndroits.infoEndroit);
router.get('/endroit/commentaire/nouveau', ctrlEndroits.ajouterCommentaire);

// ***************************************************************************************

/**
 *
 * @description Routing pour les Autres pages
 *
 */

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
