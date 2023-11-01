import { useEffect, useState } from "react"
import axios from "axios"
const url = new URL("http://localhost:3001")
export const GetData = () => {
  const [data,setData]=useState(null)
  useEffect(()=>{
    axios.get(`${url}data`).then((data)=>{
     setData(data.data);
     
    })
  },[])
  console.log(data,"dataState")
  return (
    <div>{data.map((emploee)=>{
      return(
        <div key={emploee.id}>
        <h3 >{emploee.name}</h3>
        <p>{emploee.occupation}</p>
        </div>
      )
    })}</div>
  )
}
