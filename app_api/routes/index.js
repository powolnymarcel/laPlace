var express = require('express');
var router = express.Router();
var ctrlEndroits = require('../controlleurs/endroits');
var ctrlCommentaires = require('../controlleurs/commentaires');
// endroits
router.get('/endroits', ctrlEndroits.endroitsListeParDistance);
router.post('/endroits', ctrlEndroits.creationEndroit);
router.get('/endroits/:endroitsid', ctrlEndroits.endroitsVoir);
router.put('/endroits/:endroitsid', ctrlEndroits.endroitsUpdate);
router.delete('/endroits/:endroitsid', ctrlEndroits.endroitsDelete);
// commentaires
router.post('/endroits/:endroitsid/commentaires', ctrlCommentaires.creationCommentaire);
router.get('/endroits/:endroitsid/commentaires/:commentairesid', ctrlCommentaires.commentaireVoir);
router.put('/endroits/:endroitsid/commentaires/:commentairesid', ctrlCommentaires.commentaireUpdate);
router.delete('/endroits/:endroitsid/commentaires/:commentairesid', ctrlCommentaires.commentaireDelete);
module.exports = router;
