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

// Permet d'envoyer le code de status et un message
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};


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






























module.exports.creationEndroit = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.endroitsUpdate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.endroitsDelete = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};
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
