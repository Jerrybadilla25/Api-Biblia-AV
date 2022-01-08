import React, {useState} from 'react';
import FormBook from    '../formulario/FormBook';
import FormCharter from '../formulario/FormCharter';
import FormVerse from   '../formulario/FormVerse';
import SelectForm from  '../formulario/SelectForm';
import Biblia from '../formulario/Bibli';
import Header from './Header';
import EditCharter from './EditCharter';

export default function Home(props) {
  const [select, setSelect] = useState("none");
  const [BookAll, setBookAll]= useState([]);
  //const http = " http://localhost:4200";


  React.useEffect(() => {
    cargaBook();
  }, []);


  const cargaBook = async ()=>{
    const data = await fetch(`${props.http}/books/books`, {
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json",
         "x-access-token": props.user.token
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
        <SelectForm  libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} />
        <FormBook http={props.http} BookAll={BookAll} cargaBook={cargaBook} user={props.user} />
      </div>
      
    </div>
    
  )
  if(select==="EditCharter")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} />
        <EditCharter http={props.http} BookAll={BookAll} user={props.user}/>
      </div>
    </div>
    
  )
  if(select==="Charter")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut}/>
        <FormCharter BookAll={BookAll} user={props.user} http={props.http}/>
      </div>
    </div>
    
  )
  if(select==="none")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} />
      </div>
    </div>
    
  )
  if(select==="Biblia")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} />
        <Biblia BookAll={BookAll} user={props.user} http={props.http} />
      </div>
    </div>
    
  )
}

