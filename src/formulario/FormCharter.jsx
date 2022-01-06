import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import CharterRender from '../Vistas/Charter';

export default function FormCharter(props) {
  const http = " http://localhost:4200";

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
      duration: 5000,
      position: "top-center",
      style: {
        background: "#080808",
        color: "#ffffff",
      },
    });

  const getCharter = async () => {
    const data = await fetch(`${http}/books/charter`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token
      },
    });
    const res = await data.json();
    setCharter(res);
  };

  React.useEffect(() => {
    getCharter();
  }, []);

  const onSubmit = async () => {
    const datos = watch();
    let datosJoin = "";
    if (!datos.libro) {
      const data1 = props.BookAll.find((x) => x.book === "Genesis");
      const newData = { idbook: data1._id };
      datosJoin = Object.assign(datos, newData);
    } else {
      const data1 = props.BookAll.find((x) => x.book === datos.libro);
      const newData = { idbook: data1._id };
      datosJoin = Object.assign(datos, newData);
    }
    const data = await fetch(`${http}/books/charter`, {
      method: "POST",
      body: JSON.stringify(datosJoin),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": props.user.token
      },
    });
    const res = await data.json();
    notify(res.mesage);
    getCharter();
    reset({
      charter: "",
      libro: "",
      numberVerses: "",
      testament: "",
      versiculos: "",
      version: "",
    });
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
          <label>Ingrese Libro y capitulo</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            {...register("charter", { required: "Este campo es requerido" })}
          />
          <div className="text-form-message">{errors.charter?.message}</div>
          <label>Seleccione la version</label>
          <select
            className="form-control"
            {...register("version", { required: "Este campo es requerido" })}
          >
            <option></option>
            <option>RV1960</option>
          </select>
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
          <button type="submit" className="btn-select-form mt-4">
            Guardar
          </button>
        </div>
      </form>

      {
        charter && <CharterRender charter={charter}/>
      }

      <Toaster />
    </div>
  );
}

/*

*/
