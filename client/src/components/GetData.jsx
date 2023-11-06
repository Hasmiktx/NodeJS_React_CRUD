import { useEffect, useState } from "react"
import axios from "axios"
import{v4 as uuidv4} from "uuid"
import { url } from "../constants/constants"

import '../App.css'
// console.log(import.meta.env.URL_SERVER,"url")
export const GetData = () => {
  const [data,setData]=useState(null)
  const[name,setName]=useState("");
  const[age,setAge]=useState(20);
  const[occup,setOccup]=useState("");



                   //CRUD  READ GET
   const getFromData= async()=>{
     await axios.get(`${url}/data`)
     .then((data)=>{
        console.log(data.data,"dataGet")
        setData(data.data);
        })
        .catch((err)=>
        console.log(err)
        )
   }
  useEffect(()=>{
     getFromData()
  },[])
   


               //CRUD CREATE POST
   const addPost=async (e)=>{
    e.preventDefault();
    const newEmploee={
      id:uuidv4(),
      name,
      age,
      occupation:occup,
    }
     data.push(newEmploee);
    
   await axios.post(
      `${url}/add`,
      {
        newData:data
    },
    
    )
    .then(()=>{
      getFromData();
      setName("");
      setAge(20);
      setOccup("")
    })
    .catch((err)=>{
      console.log(err)
    })
    
   }
                         //CRUD DELETE 
    const deleteEmploee=(id)=>{
        axios.delete(`${url}/data/${id}`).then(()=>{
            console.log("deleted",id)
            getFromData()
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div>
      <form className="form">
        <input  type="text" name="name" 
          value={name}
          placeholder="name" 
          onChange={(e)=>{
           setName(e.target.value)
                  }}
        />

      <input type="number" 
        min="18" max="90"
        value={age}
       onChange={(e)=>{
         setAge(e.target.value)
               }}
      />
     <input type="text" name="occupation"
        value={occup}
        placeholder="occupation"
        onChange={(e)=>{
         setOccup(e.target.value)
               }}
     />
    <button type="submit" 
      onClick={(e) => {
         addPost(e);
            }}>Add New</button>
    
</form>

    <div className="data_div">
        { data && data.map((emploee)=>{
          return( 
         <div key={emploee.id} className="emploee_div">
            {`${emploee.name} ${emploee.age}years  ${emploee.occupation}`}
      <div>
        <button type="submit" id="edit" >Edit</button>
        <button type="submit" id="delete" 
           onClick={()=>{
               deleteEmploee(emploee.id)
                 }}
            >Delete</button>
      </div>
     </div>
            )
                     })  
      }
    </div>
    </div>
  )
}
