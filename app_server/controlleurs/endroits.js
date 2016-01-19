//Pour permettre à ce controlleur de faire des appels sur l'API
var request = require('request');

//---------------------------------------------------------------
/*          Fn pour les erreurs                                */
//---------------------------------------------------------------
var _montrerErreur = function (req, res, status) {
	var titre, contenu;
	if (status === 404) {
		titre = "404, pag non trouvee";
		contenu = "Nous ne sommes pas en mesure de trouver la page demandée. Verifier votre lien internet.";
	} else {
		titre = status + ", une erreur s'est produite.";
		contenu = "Quelque chose, quelque part a mal fonctionné";
	}
	res.status(status);
	res.render('erreurSurLeSite', {
		titre : titre,
		contenu : contenu
	});
};
//---------------------------------------------------------------
/*             ------------------------------------            */
//---------------------------------------------------------------


//---------------------------------------------------------------
/* Pour le midlleware REQUEST                                  */
//---------------------------------------------------------------
//Pour savoir si on travaille en local ou sur l'hebergeur
var apiOptions = {
	server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://sleepy-waters-7506.herokuapp.com";
}
//---------------------------------------------------------------
/*             ------------------------------------            */
//---------------------------------------------------------------


//---------------------------------------------------------------
/* Render pour la page d'accueil                               */
//---------------------------------------------------------------
/* GET pour la page d'accueil */
//Va faire un appel GET sur le routeur de l'api, le routeur de l'api va donc recevoir : GET /api/endroits
//Pour le routeur cela signifie qu'il faut aller dans le Ctrl "ctrlEndroits" et lancer "endroitsListeParDistance"
module.exports.listingAccueilEndroits = function(req, res){
	var requestOptions, path;
	path = '/api/endroits';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {
			lng : 5.723485,
			lat : 50.627192,
			maxDistance : 2000000
		}
	};
	request(
		requestOptions,
		function(err, response, body) {
			var i, data;
			data = body;
				for (i=0; i<data.length; i++) {
					data[i].distance = _formatDistance(data[i].distance);
				}
				renderDeLaPageAccueil(req, res,body);
			}
	);
	var _formatDistance = function (distance) {
		var numDistance, unit;
		if (distance > 1000) {
			numDistance = parseFloat(distance / 1000).toFixed(1);
			unit = 'km';
		} else {
			numDistance = parseInt(distance, 10);
			unit = 'm';
		}
		return numDistance + unit;
	};
};
/* RENDER  pour la page d'accueil */
var renderDeLaPageAccueil = function(req, res,responseBody){
	var message;
	//Si la réponse est différente d'un array
	if (!(responseBody instanceof Array)) {
		message = "Erreur lors de la verif sur l'API";
		//Pourquoi un array vide ? Si la vue reçoit à la place un STRING elle va peter un cable :p, il est tard...
		responseBody = [];
	} else {
		//Si pas d'endroits trouvé
		if (!responseBody.length) {
			message = "Aucuns endroits trouves...";
		}
	}
	res.render('liste-accueil-endroits', {
		titre: 'laPlace, trouver des commerces proche de chez vous.',
		headerDeLaPage: {
			titre: 'laPlace',
			tagLine: 'Trouver des commerces proche de chez vous.'
		},
		sidebar: "La distance est calculée à partir d'un point donné sur Soumagne",
		endroits: responseBody,
		message: message
	});
};
//---------------------------------------------------------------
/*             ------------------------------------            */
//---------------------------------------------------------------


//---------------------------------------------------------------
/* Render pour la page information detaillées sur l'endroit    */
//---------------------------------------------------------------
/* GET pout la page infos detailless endroit*/
module.exports.infoEndroit = function(req, res){
	var requestOptions, path;
	path = "/api/endroits/" + req.params.endroitsid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			var data = body;
			//Si l'endroit est trouve donc un code 200
			if (response.statusCode === 200) {
				data.coords = {
					lng : body.coords[0],
					lat : body.coords[1]
				};
				renderDeLaPageDetailsEndsroit(req, res,data);
			} else {
				//Sinon, afficher erreur en fonction du code erreur
				_montrerErreur(req, res, response.statusCode);
			}
		}
	);
};
/* RENDER page infos detailless endroit*/
var renderDeLaPageDetailsEndsroit = function (req, res,detailsEndroitUnique) {
	res.render('info-endroit', {
		titre: detailsEndroitUnique.nom,
		headerDeLaPage: {
			titre: detailsEndroitUnique.nom
		},
		sidebar: {
			texte: 'Se trouve sur laPlace car c est un commerce qui a ete demandé par la communaute',
			tagline: 'Si vous avez quelque chose à dire sur ce commerce, veuillez le faire via le formulaire.'
		},
		endroit:detailsEndroitUnique
	});
};
//---------------------------------------------------------------
/*             ------------------------------------            */
//---------------------------------------------------------------


//---------------------------------------------------------------
/* Render pour la page ajouter un commentaire                   */
//---------------------------------------------------------------
/* GET pout la page ajouter commentaire*/
module.exports.ajouterCommentaire = function(req, res){
	renderAjouterCommentaire(req, res);
};

/* RENDER pout la page ajouter commentaire*/
var renderAjouterCommentaire = function (req, res) {
	res.render('ajout-commentaire', {
		titre: 'Ajouter commentaire sur l\'endroit',
		headerDeLaPage: {
			titre: 'Ajouter commentaire sur l\'endroit'
		}
	});
};
//---------------------------------------------------------------
/*             ------------------------------------            */
//---------------------------------------------------------------


module.exports.ajoutEndroit = function(req, res) {
	res.render('ajout-endroit', {
		titre: 'ajout-endroit',
		headerDeLaPage: {
			titre: 'ajout endroit'
		}
	});
};








var renderEdit = function(req, res,responseBody){

	res.render('edit-endroits', {
		endroits: responseBody
	});
};
module.exports.editerEndroit = function(req, res) {
	var requestOptions, path;
	path = "/api/endroits/" + req.params.endroitsid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			var data = body;
				renderEdit(req, res,data);

		}
	);
};



var renderEditFin = function(req, res,responseBody){

	res.render('edit-endroits', {
		endroits: responseBody
	});
};
module.exports.editerEndroitFin = function(req, res) {

	var requestOptions, path;
	path = "/api/endroits/" + req.params.endroitsid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "PUT",
		json : req.body
	};
	request(
		requestOptions,
		function(err, response, body) {
			var data = body;
			renderEditFin(req, res,data);

		}
	);
};
