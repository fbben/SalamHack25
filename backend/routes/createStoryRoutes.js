const { Router } = require ('express');
const router = Router();

const createStory = require('../controllers/createStoryController/createStory');
const authMiddleware = require('../src/middleware/middleware');


// handling post request
router.post('/',authMiddleware,createStory);

module.exports = router;