/* Render pour la page Accueil */
module.exports.listingAccueilEndroits = function(req, res){
	res.render('liste-accueil-endroits', { titre: 'Liste des endroits' });
};
/* Render pour la page information sur l'endroit */
module.exports.infoEndroit = function(req, res){
	res.render('info-endroit', { titre: 'Info endroit ' });
};
/* Render pour la page ajouter un commentaire */
module.exports.ajouterCommentaire = function(req, res){
	res.render('ajout-commentaire', { titre: 'Ajouter commentaire ' });
};
