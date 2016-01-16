/* GET 'home' page */
module.exports.listingAccueil = function(req, res){
	res.render('index', { title: 'Accueil' });
};
/* GET 'Location info' page */
module.exports.infoEndroit = function(req, res){
	res.render('index', { title: 'Info endroit ' });
};
/* GET 'Add review' page */
module.exports.ajouterCommentaire = function(req, res){
	res.render('index', { title: 'Ajouter commentaire ' });
};
