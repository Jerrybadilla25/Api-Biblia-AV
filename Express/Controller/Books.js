const Book = require('../model/model.book');
const Charter = require('../model/model.charter');
const Verse = require('../model/model.verse');
const Versiones = require('../model/model.version');


exports.getBook = async (req, res) => {
  const user = req.params.userName;
  const data = await Book.find({ userCreator: user });
  
  /*
  let charte = await Charter.find();
  for(var i =0; i<charte.length; i++){
    let char = charte[i].charter;
    let ver = charte[i].verses;
    for(var e = 0; e<ver.length; e++){
      let t = ver[e];
      console.log(t)
        await Verse.findByIdAndUpdate({_id: t }, {$set: {originCharter: char }});
        console.log(`${char} en ${t}`);
    }
  }
  */
  //console.log(charte)

  /*
    let databook = data[0];
    let idBook = databook._id;
    let capitulo = databook.capitulos;
    let idcapitulo = capitulo[22];
    
    const datos = await Charter.findById(idcapitulo);
    if(datos===null){
      console.log(`no existe este capitulo ${idcapitulo}`);
    }else{
      if(datos.idBook){
      console.log("idBook ya existe");
     }else{
      console.log("actualizando");
      //let charter = await Charter.findById(idcapitulo);
      await Charter.findByIdAndUpdate({_id: idcapitulo}, {$set: {idBook: idBook}});
    }

    }
    */
    /*
   for(i = 0; i<data.length; i ++){
    let databook = data[i];
    let idBook = databook._id;
    let capitulo = databook.capitulos;
    for(a =0; a<capitulo.length; a ++){
      let idcapitulo = capitulo[a];
      let datos = await Charter.findById(idcapitulo);
      if(datos===null){
        console.log(`no existe este capitulo ${idcapitulo}`);
      }else{
        if(datos.idBook){
          console.log("idBook ya existe");
        }else{
          console.log("actualizando");
          await Charter.findByIdAndUpdate({_id: idcapitulo}, {$set: {idBook: idBook}});
        }
      }
    }
   }
*/

/*
    const data1 = data.filter(x=>x.version === 'Biblia_del_oso_1569' );
    let versiones = await Versiones.findById("61e39b79081c8c50141668bf");
    for(let i=0; i<data1.length; i ++){
      versiones.books.push(data1[i]._id);
      console.log(data1[i]._id);
    }
    await versiones.save();
    */
  res.json(data);
};



exports.addBook = async (req, res)=>{
  const books = await Book.find({version: req.body.version});
  const filterArray = books.filter(x => x.book === req.body.book);
  if(filterArray.length>=1){
    res.json({mesage: `El libro de ${req.body.book} ya esta registrado`});
  }else{
    let versions = await Versiones.findById(req.body.idBook);
    const {book, order, version, testament, nomenclatura, userCreator} = req.body;
    const data = new Book({book, order, version, testament, nomenclatura, userCreator});
    versions.books.push(data._id);
    await data.save();
    await versions.save();
    res.status(200).json({mesage: "Libro agregado correctamente"});
  }
  
}

exports.addCharter = async(req, res)=>{
  const {version, idbook, testament, versiculos, numberVerses, order, libro, userCreator}= req.body;
  const charter = libro+" "+order;
  const validate = await Charter.findOne({charter: charter});
  if(validate !== null){
    res.json({mesage: `El capitulo ${validate.charter} ya existe`});
  }else{
    //ver funciones callback mas abajo
    const replaceVerseMas = replaceVerse(versiculos, numberVerses);
    const arrayVerses = divideVerse(replaceVerseMas);
    const BooksData = await Book.findById(idbook);
    const newCharter = await Charter({charter, version, testament, order, userCreator, idbook});
    BooksData.capitulos.push(newCharter._id);
    await BooksData.save();
    for(let n = 0; n<arrayVerses.length; n++ ){
      const newVerse = await Verse({
        version: version, 
        testament: testament,
        userCreator: userCreator, 
        numero: n+1, 
        originCharter: charter,
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
    const userName = req.params.userName;
    const userVersion = req.params.version;
    const data = await Charter.find({userCreator: userName});
    const data2 = data.filter(x => x.version === userVersion);
    res.json(data2);
}



exports.getBookPopulate = async(req, res)=>{
  const data = await Book.find().populate('capitulos');
  res.json(data);
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
    const idBooks = req.params.idBook;
    console.log(`idbook ${idBooks}`);
    const idCharter = req.params.id;
    console.log(`idCharter ${idCharter}`);
    const data = await Charter.findById(idCharter);
    for(let n=0; n<data.verses.length; n ++){
      await Verse.findByIdAndDelete(data.verses[n]);
    }
    await Charter.findByIdAndDelete(data._id);
    //borarr id capitulo del book.capitulos
    const books = await Book.findById(idBooks);
    const index = books.capitulos.indexOf(idCharter);
    console.log(index);
    books.capitulos.splice(index, 1);
    console.log(books);
    res.json({mesage: `${data.charter} ha sido borrado`});
}

exports.editVerse = async (req, res)=>{
   await Verse.findByIdAndUpdate(req.body._id, req.body);
   res.json({mesage: "Cambios realizados"});
}

exports.addVersiones = async (req, res)=>{
  const {versionBible, descripcion, copyright, userCreator}= req.body;
  const newVersion = await Versiones({versionBible, descripcion, copyright, userCreator});
  await newVersion.save();
  res.json({mesage: "Nueva version agregada"});
}

exports.getVersiones = async (req, res)=>{
  const versions = await Versiones.find();
  res.json(versions);
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
