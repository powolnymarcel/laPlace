/* GET 'about' page */
module.exports.aPropos = function(req, res){
	res.render('index', { title: 'A propos' });
};
