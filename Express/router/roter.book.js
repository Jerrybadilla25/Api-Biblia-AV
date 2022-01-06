const express = require("express");
const router = express.Router();

const Controller = require('../Controller/Books');
const verfyToken = require('../Auth/Token');

//Rutas

router.get('/books', verfyToken, Controller.getBook);
router.post("/books",verfyToken, Controller.addBook);

router.post('/charter',verfyToken, Controller.addCharter);
router.get('/charter',verfyToken, Controller.getCharter);

router.get('/books/populate',verfyToken, Controller.getBookPopulate);

router.get('/editGetCharter/:id',verfyToken, Controller.getCharterEdit);

router.get('/editCharter/:id',verfyToken, Controller.editCharter);

router.delete('/editCharter/:id',verfyToken, Controller.deleteCharter);


module.exports = router;