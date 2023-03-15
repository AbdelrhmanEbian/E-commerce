import { doc, updateDoc ,getDoc} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db, st } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
function Update() {
    const[done,setdone]=useState(false)
    const {id}=useParams()
    const {updated}=useSelector(state=>state)
    // const get=async()=>{
    //     const resf=doc(db,"products",id)
    //         const data = await getDoc(resf);
    //         const storage = ref(st, "images/"+data.id);
    //         const url = await getDownloadURL(storage);
    //         setproduct(
    //                  { ...data.data(), id: data.id, img: url } 
    //           );
    // }
    const handlesubmit=async(e)=>{
        e.preventDefault()
        
    const size = e.target[0].value === ""? updated.size :e.target[0].value;
    const name = e.target[1].value === ""?updated.name :e.target[1].value;
    const color = e.target[2].value === ""?updated.color :e.target[2].value;
    const quan = e.target[3].value === ""?updated.quan :e.target[3].value;
    const price = e.target[4].value === ""?updated.price :e.target[3].value;
    const file = e.target[5].files[0] ;
    const data= doc(db,"products",id)
    const storage=ref(st,"images/"+id)
    try {
        await updateDoc(data,{
            size:size,
            name:name,
            color:color,
            quan:quan,
            price:price
        })
        if (file) {
            const upload=await uploadBytesResumable(storage,file)
        }
        setdone(true)   
    } catch (error) {
    }
    }   
 
  return (
    <div>
     <form action="" onSubmit={handlesubmit} className="form">
        <div className="inputs">
        <input type="text" placeholder="size" />
        <input type="text" placeholder="name" />
        <input type="text" placeholder="color" />
        <input type="text" placeholder="quantity" />
        <input type="text" placeholder="price" />
        <input type="file" id="file" hidden/>
        </div>
        <label htmlFor="file">update Photo</label>
        <button>update product</button>
      {done && <h4>data was uploaded to server</h4>}
      </form>    
      </div>
  )
}

export default Update
