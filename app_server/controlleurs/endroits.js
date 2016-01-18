//Pour permettre à ce controlleur de faire des appels sur l'API
var request = require('request');
//Pour savoir si on travaille en local ou sur l'hebergeur
var apiOptions = {
	server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://sleepy-waters-7506.herokuapp.com/";
}


//---------------------------------------------------------------
/* Render pour la page d'accueil                               */
//---------------------------------------------------------------

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
		sidebar: "laPlace, trouver des commerces proche de chez vous............SIDEBAR",
		endroits: responseBody,
		message: message
	});
};

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
			maxDistance : 20000000
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


//---------------------------------------------------------------
/* Render pour la page information detaillées sur l'endroit    */
//---------------------------------------------------------------
module.exports.infoEndroit = function(req, res) {
	res.render('info-endroit', {
		titre: 'Delhaize',
		headerDeLaPage: {
			titre: 'Delhaize'
		},
		sidebar: {
			texte: 'Se trouve sur laPlace car c est un commerce qui a ete demandé par la communaute',
			tagline: 'Si vous avez quelque chose à dire sur ce commerce, veuillez le faire via le formulaire.'
		},
		endroit: {
			nom: 'Delhaize',
			adresse: 'Rue de commerce 34, 4630 Soumagne',
			note: 2,
			services: ['pains frais','boissons','legumes'],
			coords: {
				lng: 5.736104,
				lat: 50.632282
			},
			heuresOuverture: [{
				jours: 'Lundi - Vendredi',
				ouverture: '7:00',
				fermeture: '19:00',
				ferme: false
			}, {
				jours: 'Samedi',
				ouverture: '8:00',
				fermeture: '17:00',
				ferme: false
			}, {
				jours: 'Dimanche',
				ferme: true
			}],
			commentaires: [{
				auteur: 'Poma',
				note: 5,
				temps: '16 janvier 2016',
				texte: 'Endroit calme et sympathique.'
			}, {
				auteur: 'Josette',
				note: 3,
				temps: '16 Mars 2019',
				texte: 'Un magasin quoi...'
			}]
		}
	});
};

//---------------------------------------------------------------
/* Render pour la page ajouter un commentaire                   */
//---------------------------------------------------------------
module.exports.ajouterCommentaire = function(req, res) {
	res.render('ajout-commentaire', {
		titre: 'ajout-commentaire sur l\'endroit,',
		headerDeLaPage: {
			titre: 'ajout-commentaire sur l\'endroit'
		}
	});
};
