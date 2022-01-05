const express = require("express");
const router = express.Router();

const Controller = require('../Controller/Books');

//Rutas

router.get('/books', Controller.getBook);
router.post("/books", Controller.addBook);

router.post('/charter', Controller.addCharter);
router.get('/charter', Controller.getCharter);

router.get('/books/populate', Controller.getBookPopulate);

router.get('/editGetCharter/:id', Controller.getCharterEdit);

router.get('/editCharter/:id', Controller.editCharter);

router.delete('/editCharter/:id', Controller.deleteCharter);


module.exports = router;