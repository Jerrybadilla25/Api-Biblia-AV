const Book = require('../model/model.book');
const Charter = require('../model/model.charter');
const Verse = require('../model/model.verse');


exports.getBook = async (req, res)=>{
    const data = await Book.find();
    res.json(data);
}

exports.addBook = async (req, res)=>{
  const books = await Book.findOne({book: req.body.book});
  if(books){
    res.json({mesage: `El libro de ${req.body.book} ya esta registrado`});
  }else{
    const {book, order, version, testament, nomenclatura} = req.body;
    const data = new Book({book, order, version, testament, nomenclatura});
    await data.save();
    res.status(200).json({mesage: "Libro agregado correctamente"});
  }
  
}

exports.addCharter = async(req, res)=>{
  const {version, idbook, testament, versiculos, numberVerses, order, libro}= req.body;
  const charter = libro+" "+order;
  console.log(charter);
  const validate = await Charter.findOne({charter: charter});
  if(validate){
    res.json({mesage: `El capitulo ${validate.charter} ya existe`});
  }else{
    //ver funciones callback mas abajo
    const replaceVerseMas = replaceVerse(versiculos, numberVerses);
    const arrayVerses = divideVerse(replaceVerseMas);
    const BooksData = await Book.findById(idbook);
    const newCharter = await Charter({charter, version,testament, order});
    BooksData.capitulos.push(newCharter._id);
    await BooksData.save();
    for(let n = 0; n<arrayVerses.length; n++ ){
      const newVerse = await Verse({
        version: version, 
        testament: testament, 
        numero: n+1, 
        versiculo: arrayVerses[n]
      });
      newCharter.verses.push(newVerse._id);
      await newVerse.save();  
    }
    await newCharter.save();
    res.json({mesage: "Datos guardados correctamente"});
  }
  
}

exports.getCharter = async(req, res)=>{
    const data = await Charter.find();
    res.json(data);
}

exports.getBookPopulate = async(req, res)=>{
  const datos = await Book.find().populate('capitulos');
  res.json(datos);
}

exports.getCharterEdit = async (req, res)=>{
  const datos = await Book.findById(req.params.id).populate("capitulos");
  res.json(datos);
}

exports.editCharter = async (req, res)=>{
  const data = await Charter.findById(req.params.id).populate('verses');
  res.json(data);
}

exports.deleteCharter = async (req, res)=>{
    const data = await Charter.findById(req.params.id);
    for(let n=0; n<data.verses.length; n ++){
      await Verse.findByIdAndDelete(data.verses[n]);
    }
    await Charter.findByIdAndDelete(data._id);
    res.json({mesage: `${data.charter} ha sido borrado`});
}

exports.editVerse = async (req, res)=>{
   await Verse.findByIdAndUpdate(req.body._id, req.body);
   res.json({mesage: "Cambios realizados"});
}





//funciones callback
const replaceVerse = (versiculos, numberVerses)=>{
  const y = parseInt(numberVerses);
  let verseCombertido= versiculos;
  for(let i=1; i<y+2; i++){
    let num = i;
    let text = num.toString();
    let ver = verseCombertido.replace(text, "+");
    verseCombertido= ver;
  }
  return verseCombertido;
}


const divideVerse = (replaceVerseMas)=>{
  let verses = replaceVerseMas;
  let cadena= verses.split("+");
  cadena.shift();
  return cadena;
}

//fin de funciones callback
