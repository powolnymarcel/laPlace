var mongoose = require('mongoose');
var Endroit = mongoose.model('Endroit');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
module.exports.creationCommentaire = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};



module.exports.commentaireVoir = function(req, res) {
	if (req.params && req.params.endroitsid && req.params.commentairesid) {
		Endroit
			.findById(req.params.endroitsid)
			.select('nom commentaires')
			.exec(
				function(err, endroits) {
					var response, commentaire;
					if (!endroits) {
						sendJsonResponse(res, 404, {
							"message": "l'id de l'endroit est non trouve"
						});
						return;
					} else if (err) {
						sendJsonResponse(res, 400, err);
						return;
					}
					if (endroits.commentaires && endroits.commentaires.length > 0) {
						commentaire = endroits.commentaires.id(req.params.commentairesid);
						if (!commentaire) {
							sendJsonResponse(res, 404, {
								"message": "l'id du commentaire est non trouve"
							});
						} else {
							response = {
								endroits : {
									nom : endroits.nom,
									id : req.params.endroitsid
								},
								commentaire : commentaire
							};
							sendJsonResponse(res, 200, response);
						}
					} else {
						sendJsonResponse(res, 404, {
							"message": "Aucuns commentaire trouvé"
						});
					}
				}
			);
	} else {
		sendJsonResponse(res, 404, {
			"message": "Pas trouve, l'id de l'endroit & du commentaire sont requis"
		});
	}
};

module.exports.commentaireUpdate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.commentaireDelete = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};
