
const API = "http://ajustes.api.bibliaav.ml/books/verseDiaManual"
//const API = "http://localhost:4001/books/verseDiaManual"


export const getStart = async (datos, token)=>{
    const data = await fetch(`${API}`, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-access-token": token
      },
    });
    const res = await data.json()
    return res
  }