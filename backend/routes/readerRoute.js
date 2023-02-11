const Router = require('express');
const router = new Router();

const ReaderController = require('../contollers/readerController');

router.post('/reader', ReaderController.addReader);
router.get('/reader', ReaderController.getAllReaders);

module.exports = router;