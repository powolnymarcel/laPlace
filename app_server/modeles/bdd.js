var mongoose = require('mongoose');
//Adresse de la bdd, pas besoin de spécifier de port, username et pwd, c'est optionnel.
var bddURI = 'mongodb://localhost/laPlace';
var fermetureElegante;
mongoose.connect(bddURI);



//---------------------------------------------------------------
/*  Gestionnaire d'evenement de connexion mongoose             */
//---------------------------------------------------------------
mongoose.connection.on('connected', function () {
	console.log('----> Mongoose connecté a ' + bddURI);
});
mongoose.connection.on('error',function (err) {
	console.log('----> Mongoose erreur: ' + err);
});
mongoose.connection.on('disconnected', function () {
	console.log('----> Mongoose est deconnecte');
});





//---------------------------------------------------------------------------
//                                                                         //
//                   Tout le code ci-dessous:                              //
//                    FERMETURE DE CONNEXION                               //
//                  **************************                             //
//                                                                         //
//       SIGINT est un signal au niveau de l'OS(win, osx, linux),          //
//       ce signaL est émulé pour les anciennes vers de windows pour       //
//       indiquer une deconnexion de la BDD.                               //
//       Fait partie des bonnes pratiques, si on ouvre, on ferme aussi...  //
//                                                                         //
//---------------------------------------------------------------------------
var readLine = require ("readline");
if (process.platform === "win32"){
	var rl = readLine.createInterface ({
		input: process.stdin,
		output: process.stdout
	});
	rl.on ("SIGINT", function (){
		process.emit ("SIGINT");
	});
	rl.on ("SIGUSR2", function (){
		process.emit ("SIGUSR2");
	});
}

//---------------------------------------------------------------
/*  Fermeture elegante  de la connextion                       */
//---------------------------------------------------------------
  fermetureElegante = function (msg, callback) {
	mongoose.connection.close(function () {
		console.log('Mongoose a bien ete deconnecte ' + msg);
		callback();
	});
};

//---------------------------------------------------------------
/*  Capture l'evenement de fin du process                      */
//---------------------------------------------------------------

//Pour un redemarrage NODEMON
process.once('SIGUSR2', function () {
	fermetureElegante('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});

//Pour une fin de l'appli
process.on('SIGINT', function () {
	fermetureElegante('fin de l\'app', function () {
		process.exit(0);
	});
});
//Pour une fin de l'appli sur HEROKU
process.on('SIGTERM', function() {
	fermetureElegante('Fermeture de l\'app sur Heroku', function () {
		process.exit(0);
	});
});
//---------------------------------------------------------------------------
//               *******************************                           //
//---------------------------------------------------------------------------


//---------------------------------------------------------------
/*  On appelle le modele endroit                               */
//---------------------------------------------------------------
require('./endroit');
