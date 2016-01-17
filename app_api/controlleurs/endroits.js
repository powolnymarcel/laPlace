var mongoose = require('mongoose');
var Endroit = mongoose.model('Endroit');


var theEarth = (function(){
	var earthRadius = 6371; // km, miles is 3959
	var getDistanceFromRads = function(rads) {
		return parseFloat(rads * earthRadius);
	};
	var getRadsFromDistance = function(distance) {
		return parseFloat(distance / earthRadius);
	};
	return {
		getDistanceFromRads : getDistanceFromRads,
		getRadsFromDistance : getRadsFromDistance
	};
})();

//---------------------------------------------------------------
/*              Fn pour le status + message                    */
//---------------------------------------------------------------
// Permet d'envoyer le code de status et un message
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
//---------------------------------------------------------------
/*              VOIR ENDROIT PAR DISTANCE                      */
//---------------------------------------------------------------
/* GET api/endroits */
/* Recupère la liste des endroits basés sur la requete de distance */
module.exports.endroitsListeParDistance = function(req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var maxDistance = parseFloat(req.query.maxDistance);
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	var geoOptions = {
		spherical: true,
		maxDistance: theEarth.getRadsFromDistance(maxDistance),
		num: 10
	};
	if (!lng || !lat || !maxDistance) {
		console.log('il manque des parametres pour la fn endroitsListeParDistance ');
		sendJsonResponse(res, 404, {
			"message": "les parametres : lng, lat et maxDistance sont tous requis!"
		});
		return;
	}
	Endroit.geoNear(point, geoOptions, function(err, results, stats) {
		var endroits;
		console.log('Geo Resultats', results);
		console.log('Geo stats', stats);
		if (err) {
			console.log('geoNear error:', err);
			sendJsonResponse(res, 404, err);
		} else {
			endroits = construireLaListeDesEndroits(req, res, results, stats);
			sendJsonResponse(res, 200, endroits);
		}
	});
};

var construireLaListeDesEndroits = function(req, res, results, stats) {
	var endroits = [];
	results.forEach(function(doc) {
		endroits.push({
			distance: theEarth.getDistanceFromRads(doc.dis),
			nom: doc.obj.nom,
			adresse: doc.obj.adresse,
			note: doc.obj.note,
			services: doc.obj.services,
			_id: doc.obj._id
		});
	});
	return endroits;
};

//---------------------------------------------------------------
/*                  VOIR ENDROIT  PAR ID                       */
//---------------------------------------------------------------
/* GET /api/endroits */
module.exports.endroitsVoir = function(req, res) {
	console.log('Affichage des details de l\'endroit ID: ', req.params);
	if (req.params && req.params.endroitsid) {
		//Endroit = le modèle Endroit
		Endroit
			.findById(req.params.endroitsid)
			.exec(function(err, endroits) {
				if (!endroits) {
					console.log('*identifiant de l\'endroit non trouve*');
					sendJsonResponse(res, 404, {
						"message": "identifiant de l'endroit non trouve"
					});
					return;
				} else if (err) {
					console.log(err);
					sendJsonResponse(res, 404, err);
					return;
				}
				console.log(endroits);
				sendJsonResponse(res, 200, endroits);
			});
	} else {
		console.log('Pas d\'endroit spécifié dans la requete');
		sendJsonResponse(res, 404, {
			"message": "Pas d'endroit spécifié dans la requete"
		});
	}
};
//---------------------------------------------------------------
/*                  CREER ENDROIT                              */
//---------------------------------------------------------------
/*POST /api/endroits */
module.exports.creationEndroit = function(req, res) {
	Endroit.create({
		nom: req.body.nom,
		adresse: req.body.adresse,
		services: req.body.services.split(","),
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		heuresOuverture: [{
			jours: req.body.jours1,
			ouverture: req.body.ouverture1,
			fermeture: req.body.fermeture1,
			ferme: req.body.ferme1,
		}, {
			jours: req.body.jours2,
			ouverture: req.body.ouverture2,
			fermeture: req.body.fermeture2,
			ferme: req.body.ferme2,
		}]
	}, function(err, endroits) {
		if (err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 201, endroits);
		}
	});
};

//---------------------------------------------------------------
/*                  METTRE A JOUR ENDROIT                      */
//---------------------------------------------------------------
/* PUT /api/endroits/:endroitsid */
module.exports.endroitsUpdate = function(req, res) {
	if (!req.params.endroitsid) {
		sendJsonResponse(res, 404, {
			"message": "Pas trouve, le id de l'endroit est requis"
		});
		return;
	}
	Endroit
		.findById(req.params.endroitsid)
		//Select tous sauf les 2 champs suivants
		.select('-commentaires -note')
		.exec(
			function(err, endroits) {
				if (!endroits) {
					sendJsonResponse(res, 404, {
						"message": "ID endroit non trouve"
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 400, err);
					return;
				}
				endroits.nom = req.body.nom;
				endroits.adresse = req.body.adresse;
				endroits.services = req.body.services.split(",");
				endroits.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
				endroits.heuresOuverture = [{
					jours: req.body.jours1,
					ouverture: req.body.ouverture1,
					fermeture: req.body.fermeture1,
					ferme: req.body.ferme1,
				}, {
					jours: req.body.jours2,
					ouverture: req.body.ouverture2,
					fermeture: req.body.fermeture2,
					ferme: req.body.ferme2,
				}];
				endroits.save(function(err, endroits) {
					if (err) {
						sendJsonResponse(res, 404, err);
					} else {
						sendJsonResponse(res, 200, endroits);
					}
				});
			}
		);
};


//---------------------------------------------------------------
/*                  DELETE ENDROIT                             */
//---------------------------------------------------------------
/* DELETE /api/endroits/:endroitsid */
module.exports.endroitsDelete = function(req, res) {
	var endroitsid = req.params.endroitsid;
	if (endroitsid) {
		Endroit
			.findByIdAndRemove(endroitsid)
			.exec(
				function(err, endroits) {
					if (err) {
						console.log(err);
						sendJsonResponse(res, 404, err);
						return;
					}
					console.log("ID endroit " + endroitsid + " SUPPRIME !!!");
					sendJsonResponse(res, 204, null);
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message": "Pas de ID endroit"
		});
	}
};
