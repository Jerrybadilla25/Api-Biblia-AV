import React from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function FormVersion(props) {
    const {register,handleSubmit,watch,reset,formState: { errors },} = useForm();

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
        
    const addVersionBiblia = async ()=>{
        let user = {userCreator: props.user.user};
        let versions = watch();
        let array = Object.assign(user, versions);
        const data = await fetch(`${props.http}/books/versiones`,{
            method: "POST",
            body: JSON.stringify(array),
            headers: {
                "Content-Type": "application/json",
                 Accept: "application/json",
                "x-access-token": props.user.token,
            },
        });
        const res = await data.json();
        notify(res.mesage);
        reset({
            versionBible: "",
            descripcion: "",
            copyright: ""
        });
    }    
        
        
        
      
    return (
        <div className="container">
            <form className="form-per" onSubmit={handleSubmit(addVersionBiblia)}>
                <div className="form-group">
                    <label htmlFor="">Ingrese version</label>
                    <input 
                    type="text"
                    className="form-control"
                    {...register("versionBible", { required: "Este campo es requerido" })}
                     />
                     <div className="text-form-message">{errors.versionBible?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="">Descripcion</label>
                    <input 
                    type="text"
                    className="form-control"
                    {...register("descripcion", { required: "Este campo es requerido" })}
                     />
                     <div className="text-form-message">{errors.descripcion?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="">Copyrigth</label>
                    <input 
                    type="text"
                    placeholder='Quien posee los derechos de autor'
                    className="form-control"
                    {...register("copyright", { required: "Este campo es requerido" })}
                     />
                     <div className="text-form-message">{errors.copyright?.message}</div>
                </div>
                <button type="submit" className="btn-select-form mt-3">
                    Guardar
                </button>
            </form>
            <Toaster />
        </div>
    )
}
