import React, {useState} from 'react';
import FormBook from    '../formulario/FormBook';
import FormCharter from '../formulario/FormCharter';
import FormVerse from   '../formulario/FormVerse';
import SelectForm from  '../formulario/SelectForm';
import Biblia from '../formulario/Bibli';
import Header from './Header';
import EditCharter from './EditCharter';

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

  
  const EditCharte = ()=>{
    setSelect("EditCharter")
  }

  const Bibliaapp = ()=>{
    setSelect("Biblia")
  }

  if(select==="Book")
  return (
    <div>
      <Header/>
      <div className='container'>
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} />
        <FormBook BookAll={BookAll} cargaBook={cargaBook} />
      </div>
      
    </div>
    
  )
  if(select==="EditCharter")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} />
        <EditCharter http={http} BookAll={BookAll}/>
      </div>
    </div>
    
  )
  if(select==="Charter")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} />
        <FormCharter BookAll={BookAll}/>
      </div>
    </div>
    
  )
  if(select==="none")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} />
      </div>
    </div>
    
  )
  if(select==="Biblia")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} />
        <Biblia BookAll={BookAll} />
      </div>
    </div>
    
  )
}

