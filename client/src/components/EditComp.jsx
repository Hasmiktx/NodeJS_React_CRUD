import { useState } from "react"
import axios from "axios";
import { url } from "../constants/constants";
import "../App.css"

const EditComp = ({id,setEditeMode,getFromData,emp}) => {
    const[editName,setEditName]=useState("");
    const[editAge,setEditAge]=useState("");
    const[editOccup,setEditOccup]=useState("");

      const editEmploee= async (id)=>{
      await  axios.put(`${url}/data/${id}`, {
            
            
            name:editName,
            age:editAge,
            occupation:editOccup
          })
            .then((response) => {
              console.log(response.data);
              getFromData();
            })
            .catch((error) => {
              console.error(error)
            }).finally(()=>{
                setEditeMode(false);
            })
                

            

            
      }
  return (
    <form className="editeMode_div">
      <input  type="text" name="name" 
          placeholder={emp.name}
          
          onChange={(e)=>{setEditName(e.target.value)}}
          
        />

      <input type="number" 
        min="18" max="90"
        
        onChange={(e)=>setEditAge(e.target.value)}
       
      />
     <input type="text" name="occupation"
        placeholder={emp.occupation}
        
        onChange={(e)=>setEditOccup(e.target.value)}
     />
    <button type="submit" 
    onClick={(e)=>{
        e.preventDefault();
        editEmploee(id)
    }}
     >Save</button>
     </form>
  )

  }
export default EditComp