//Recup de la page principale
module.exports.index = function(req, res){
	res.render('index', { title: 'Express' });
};
