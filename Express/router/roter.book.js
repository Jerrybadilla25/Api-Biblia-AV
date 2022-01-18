const express = require("express");
const router = express.Router();

const Controller = require('../Controller/Books');
const verfyToken = require('../Auth/Token');

//Rutas

router.get('/books/:userName', verfyToken, Controller.getBook);
router.post("/books",verfyToken, Controller.addBook);

router.post('/charter',verfyToken, Controller.addCharter);
router.get('/charter/:userName/:version',verfyToken, Controller.getCharter);

router.get('/books/populate',verfyToken, Controller.getBookPopulate);

router.get('/editGetCharter/:id',verfyToken, Controller.getCharterEdit);

router.get('/editCharter/:id',verfyToken, Controller.editCharter);

router.delete('/editCharter/:id/:idBook',verfyToken, Controller.deleteCharter);

router.post('/editVerses',verfyToken, Controller.editVerse);

router.post('/versiones', verfyToken, Controller.addVersiones);
router.get('/versiones', verfyToken, Controller.getVersiones);


module.exports = router;