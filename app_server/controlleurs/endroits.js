/* Render pour la page Accueil */
module.exports.listingAccueil = function(req, res){
	res.render('index', { title: 'Accueil' });
};
/* Render pour la page information sur l'endroit */
module.exports.infoEndroit = function(req, res){
	res.render('index', { title: 'Info endroit ' });
};
/* Render pour la page ajouter un commentaire */
module.exports.ajouterCommentaire = function(req, res){
	res.render('index', { title: 'Ajouter commentaire ' });
};
