import React, {useState} from 'react';
import FormBook from    '../formulario/FormBook';
import FormCharter from '../formulario/FormCharter';
import FormVerse from   '../formulario/FormVerse';
import SelectForm from  '../formulario/SelectForm';
import Biblia from '../formulario/Bibli';
import Header from './Header';
import EditCharter from './EditCharter';
import FormVersion from '../formulario/FormVersion';

export default function Home(props) {
  const [select, setSelect] = useState("none");
  const [BookAll, setBookAll]= useState([]);
  const [versiones, setVersiones] = useState(null);
  //const http = " http://localhost:4200";


  React.useEffect(() => {
    cargaBook();
    getversiones();
  }, []);


  const cargaBook = async ()=>{
    const data = await fetch(`${props.http}/books/books/${props.user.user}`, {
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

  const getversiones = async () => {
    const data = await fetch(`${props.http}/books/versiones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token,
      },
    });
    const res = await data.json();
    setVersiones(res);
  };

  

  const versionBiblia = async ()=>{
    setSelect("versionBiblia");
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

  

  if(select==="versionBiblia")
  return (
    <div>
      <Header/>
      <div className='container'>
        <SelectForm  libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} versionBiblia={versionBiblia} />
        <FormVersion http={props.http} user={props.user} />
      </div>
      
    </div>
    
  )




  if(select==="Book")
  return (
    <div>
      <Header/>
      <div className='container'>
        <SelectForm  libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} versionBiblia={versionBiblia} />
        <FormBook http={props.http} BookAll={BookAll} cargaBook={cargaBook} user={props.user} versiones={versiones} getversiones={getversiones}/>
      </div>
      
    </div>
    
  )
  if(select==="EditCharter")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} versionBiblia={versionBiblia} />
        <EditCharter http={props.http} BookAll={BookAll} user={props.user} versiones={versiones}/>
      </div>
    </div>
    
  )
  if(select==="Charter")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} versionBiblia={versionBiblia}/>
        <FormCharter BookAll={BookAll} user={props.user} http={props.http} versiones={versiones} getversiones={getversiones}/>
      </div>
    </div>
    
  )
  if(select==="none")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} versionBiblia={versionBiblia} />
      </div>
    </div>
    
  )
  if(select==="Biblia")
  return (
    <div>
      <Header/>
      <div className="container">
        <SelectForm libro={libro} capitulo={capitulo} EditCharte={EditCharte} Bibliaapp={Bibliaapp} LoginOut={props.LoginOut} versionBiblia={versionBiblia} />
        <Biblia BookAll={BookAll} user={props.user} http={props.http}  versiones={versiones} />
      </div>
    </div>
    
  )
}

