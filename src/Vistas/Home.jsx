import React, {useState} from 'react';
import FormBook from    '../formulario/FormBook';
import FormCharter from '../formulario/FormCharter';
import FormVerse from   '../formulario/FormVerse';
import SelectForm from  '../formulario/SelectForm';
import Biblia from '../formulario/Bibli';

export default function Home() {
  const [select, setSelect] = useState("none");
  const [BookAll, setBookAll]= useState([]);
  const http = " http://localhost:4200";


  React.useEffect(() => {
    cargaBook();
  }, []);


  const cargaBook = async ()=>{
    const data = await fetch(`${http}/books/books`, {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
      },
    });
    const res = await data.json();
    setBookAll(res);
  }

  


  const libro = async ()=>{
    setSelect("Book");
  }


  const capitulo = ()=>{
    setSelect("Charter")
  }

  
  const versiculo = ()=>{
    setSelect("Verse")
  }

  const Bibliaapp = ()=>{
    setSelect("Biblia")
  }

  if(select==="Book")
  return (
    <div>
      <SelectForm libro={libro} capitulo={capitulo} versiculo={versiculo} Bibliaapp={Bibliaapp} />
      <FormBook BookAll={BookAll} cargaBook={cargaBook} />
    </div>
    
  )
  if(select==="Verse")
  return (
    <div>
      <SelectForm libro={libro} capitulo={capitulo} versiculo={versiculo} Bibliaapp={Bibliaapp} />
      <FormVerse/>
    </div>
    
  )
  if(select==="Charter")
  return (
    <div>
      <SelectForm libro={libro} capitulo={capitulo} versiculo={versiculo} Bibliaapp={Bibliaapp} />
      <FormCharter BookAll={BookAll}/>
    </div>
    
  )
  if(select==="none")
  return (
    <div>
      <SelectForm libro={libro} capitulo={capitulo} versiculo={versiculo} Bibliaapp={Bibliaapp} />
    </div>
    
  )
  if(select==="Biblia")
  return (
    <div>
      <SelectForm libro={libro} capitulo={capitulo} versiculo={versiculo} Bibliaapp={Bibliaapp} />
      <Biblia BookAll={BookAll} />
    </div>
    
  )
}

