import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import CharterRender from "../Vistas/Charter";

export default function FormCharter(props) {
  const [charter, setCharter] = useState();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

 
  //toaster
  const notify = (mesage) =>
    toast.success(`${mesage}`, {
      duration: 3500,
      position: "top-center",
      style: {
        background: "#080808",
        color: "#ffffff",
      },
    });


  const Loading =(message)=>
   toast.loading(`${message}`, {
    duration: 9000,
    position: "top-center",
    style: {
      background: "#080808",
      color: "#ffffff",
    },
  });

  const selectVersionBiblia = (version)=>{
    getCharter(version);
  }

  const getCharter = async (version) => {
    const data = await fetch(`${props.http}/books/charter/${props.user.user}/${version}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token,
      },
    });
    const res = await data.json();
    setCharter(res);
  };

  React.useEffect(() => {
    props.getversiones();
  }, []);

  

  
  const onSubmit = async () => {
    const userName = { userCreator: props.user.user };
    const datos = watch();
    console.log(datos.version);
    const data2 = props.BookAll.filter(x => x.version === datos.version);
    let datosJoin = "";
    if (!datos.libro) {
      const data3 = data2.find((x) => x.book === "Genesis");
      const newData = { idbook: data3._id };
      datosJoin = Object.assign(datos, newData, userName);
    } else {
      const data3 = data2.find((x) => x.book === datos.libro);
      console.log(data3);
      const newData = { idbook: data3._id };
      datosJoin = Object.assign(datos, newData, userName);
    }
    Loading("Guardando los datos......");
    const data = await fetch(`${props.http}/books/charter`, {
      method: "POST",
      body: JSON.stringify(datosJoin),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token,
      },
    });
    const res = await data.json();
    toast.remove();
    notify(res.mesage);
    getCharter(datos.version);
    reset({
      charter: "",
      libro: "",
      numberVerses: "",
      testament: "",
      versiculos: "",
      version: "",
    });
    props.getversiones();
  };



  return (
    <div className="mx-5 my-5">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="form-group">
          <label>Seleccione libro</label>
          <select
            className="form-control"
            {...register("libro", { required: "Este campo es requerido" })}
          >
            {props.BookAll.map((itm) => (
              <option key={itm._id} className="form-control">
                {itm.book}
              </option>
            ))}
          </select>
          <div className="text-form-message">{errors.libro?.message}</div>

          <label>orden de capitulo(numero)</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            {...register("order", { required: "Este campo es requerido" })}
          />
          <div className="text-form-message">{errors.order?.message}</div>

          {props.versiones !== null && (
            <div className="form-group">
              <label>Seleccione la version</label>

              <select
                className="form-control"
                name="version"
                {...register("version", { required: "Seleccione una opcion" })}
              >
                <option></option>

                {props.versiones.map((itm) => (
                  <option key={itm._id} className="form-control">
                    {itm.versionBible}
                  </option>
                ))}
              </select>

              <div className="text-form-message">{errors.version?.message}</div>
            </div>
          )}

          <label>Seleccione el testamento</label>
          <select
            className="form-control"
            {...register("testament", { required: "Este campo es requerido" })}
          >
            <option></option>
            <option>Antiguo testamento</option>
            <option>Nuevo testamento</option>
          </select>
          <div className="text-form-message">{errors.testament?.message}</div>
          <input
            type="number"
            className="form-control mt-4"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("numberVerses", {
              required: "Este campo es requerido",
            })}
            placeholder="ingrese numero de versiculo"
          />
          <div className="text-form-message">
            {errors.numberVerses?.message}
          </div>
          <textarea
            rows="10"
            cols="10"
            type="text"
            className="form-control mt-4"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("versiculos", { required: "Este campo es requerido" })}
            placeholder="copie todos los versiculos"
          />
          <div className="text-form-message">{errors.versiculos?.message}</div>
          <small className="text-muted">
            <p>
              <span>Usuario </span>
              {props.user.user}
            </p>
          </small>
          <button type="submit" className="btn-select-form mt-4">
            Guardar
          </button>
        </div>
      </form>
      <div className="mt-5">
        <h6>Seleccione una version</h6>
      </div>
            
      <div className="d-flex justify-content-start">
        {
          props.versiones.map(itm =>(
            <button 
            key={itm._id} 
            className="btn-select-biblia"
            onClick={()=>selectVersionBiblia(itm.versionBible)}
            >{itm.versionBible}</button>
          ))
        }
        
      </div>

      {charter ? <CharterRender charter={charter} />
       : <div className="box-per"></div>
      }

      <Toaster />
    </div>
  );
}

/*

*/
