/* Render pour la page Accueil */
module.exports.listingAccueilEndroits = function(req, res){
	res.render('liste-accueil-endroits', {
		titre: 'laPlace, trouver des commerces proche de chez vous.',
		headerDeLaPage: {
					titre: 'laPlace',
					tagLine: 'Trouver des commerces proche de chez vous.'
		},
		sidebar: "laPlace, trouver des commerces proche de chez vous............SIDEBAR",
		endroits: [{
					nom: 'Smatch',
					adresse: 'Rue de commerce 22, 4630 Soumagne',
					note: 3,
					services: ['pains frais','boissons','legumes'],
					distance: '100m'
				},{
					nom: 'Carrefour',
					adresse: 'Rue de commerce 777, 4630 Soumagne',
					note: 4,
					services: ['pains frais','boissons','legumes'],
					distance: '200m'
				},{
					nom: 'Delhaize',
					adresse: 'Rue de commerce 34, 4630 Soumagne',
					note: 2,
					services: ['pains frais','boissons','legumes'],
					distance: '250m'
		}]
	});
};
/* Render pour la page information detaillées sur l'endroit */
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
				lat: 51.455041,
				lng: -0.9690884
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


/* Render pour la page ajouter un commentaire */
module.exports.ajouterCommentaire = function(req, res) {
	res.render('ajout-commentaire', {
		titre: 'ajout-commentaire sur l\'endroit,',
		headerDeLaPage: {
			titre: 'ajout-commentaire sur l\'endroit'
		}
	});
};
