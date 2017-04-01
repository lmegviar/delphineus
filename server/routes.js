var router = require('express').Router();
var resourceController = require('./controllers/resourceController.js');
var fileController = require('./controllers/addFileController.js');

router.post('/load/file', fileController.addFile);

router.get('/resources', resourceController.getResources);
router.post('/resources', resourceController.postResource);
router.delete('/resources', resourceController.deleteResource);
router.put('/resource-view', resourceController.addView);
router.post('/opengraph', resourceController.getOpenGraph);

router.post('/likes', resourceController.postLike);
router.delete('/likes', resourceController.deleteLike);
router.post('/dislikes', resourceController.postDislike);
router.delete('/dislikes', resourceController.deleteDislike);

router.get('/bookmarks', resourceController.getBookmarks);
router.get('/categories', resourceController.getCategories);
router.get('/tags', resourceController.getTags);
router.post('/tags', resourceController.postTag);
router.get('/users', resourceController.getUsers);
router.get('/most-popular-tags', resourceController.getMostPopularTags);
router.put('/user-account-rank', resourceController.changeAccountRank);




module.exports = router;
