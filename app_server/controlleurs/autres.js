/* Render pour la page a-propos */
module.exports.aPropos = function(req, res){
	res.render('a-propos', { titre: 'A propos' });
};
