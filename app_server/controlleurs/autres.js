/* Render pour la page a-propos */
module.exports.aPropos = function(req, res){
	res.render('index', { title: 'A propos' });
};
