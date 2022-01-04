const express = require("express");
const router = express.Router();

const Controller = require('../Controller/Books');

const Book = require('../model/model.book');
const Charter = require('../model/model.charter');
const Verse = require('../model/model.verse');



//Rutas

router.get('/books', Controller.getBook);
router.post("/books", Controller.addBook);

router.post('/charter', Controller.addCharter);
router.get('/charter', Controller.getCharter);



/*

//add libro
router.post('/addbook', async (req, res)=>{
    const {book, order, version, testament}= req.body;
    const data = new Book({book, order, version, testament});
    await data.save();
    res.json({data});
});

//consulta libro
router.get('/getbook', async (req, res)=>{
    const book = await Book.find();
    res.json(book);
});

//consulta charter
router.get('/getCharter', async (req, res)=>{
    const charter = await Charter.find();
    res.json(charter);
});

//consulta biblia
router.post('/getLibroCapitulo', async (req, res)=>{
    const charter = await Book.findById(req.body.id).populate('capitulos');
    res.json(charter);
});

//add capitulo
router.post('/addcharter',async (req, res)=>{
    const {charter, idLibro, version, testament} = req.body;
    const libro = await Book.findById(idLibro);
    const capitulo = await Charter.find();
    const data1 = capitulo.find((x)=> x.charter === charter);
    if(data1){
        res.json({msj: "Este capitulo ya existe"});
    }else{
      const data = new Charter({charter, version, testament});
      libro.capitulos.push(data._id);
      await libro.save();
      await data.save();
      const capitulos= await Charter.find();
      res.json(capitulos);  
    }
    
});

//add versiculo
router.post('/addverse', async (req, res)=>{
    const {title, numero,versiculo, version, testament} = req.body;
    if(!req.body.libroCapitulo){
        var libroCapitulo = "Genesis 1";
        const data = await Charter.find();
        const data1 = data.find((x)=> x.charter === libroCapitulo);
        data1.versiculos.push({ title, numero, versiculo, version, testament});
        var msj = {msj: `"versiculo creado" ${numero}-${versiculo}`};
        await data1.save();
        res.json({data1, msj});
    }else{
        const data = await Charter.find();
        const data1 = data.find((x)=> x.charter === req.body.libroCapitulo);
        data1.versiculos.push({ title, numero, versiculo, version, testament});
        var msj = {msj: `"versiculo creado" ${numero}-${versiculo}`};
        await data1.save();
        res.json({data1, msj});  
    }
    
})

*/
module.exports = router;