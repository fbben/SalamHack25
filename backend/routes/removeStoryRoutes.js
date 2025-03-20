const {Router} = require ('express');
const router = Router();

const deleteStory = require ("../controllers/deleteStory");

router.delete("/:id",deleteStory);

module.exports = router;