import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, st } from "../firebase";

import { useDispatch, useSelector } from 'react-redux';
import { updated ,setproducts} from "../redux/slice";

function Admin() {
  const [products, setproductss] = useState([]);
  const p= useSelector(state=>state.products)
  useEffect(()=>{
    setproductss(p)
  })
  const dispatch=useDispatch()
  const nav=useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault();
    const size = e.target[0].value;
    const name = e.target[1].value;
    const color = e.target[2].value;
    const quan = e.target[3].value;
    const price = e.target[4].value;
    const file = e.target[5].files[0];
    const refg = collection(db, "products");
    try {
      const added = await addDoc(refg, {
        name: name,
        size: size,
        color: color,
        quan: quan,
        price:price
      });
      const storage = ref(st, "images/" + added.id);
      await uploadBytesResumable(storage, file);
    } catch (error) {
    }
    
    
    
    // dispatch(addproduct({
    //   name: name,
    //   size: size,
    //   color: color,
    //   quan: quan,
    //   price:price,
    //   img:file
    // }))
  };

  const deleteitem=async(id)=>{
    const data=doc(db,"products",id)
    await deleteDoc(data)
    const arr=products.filter(product => product.id !== id )
    dispatch(setproducts(arr))
  }
  const updateitem=product=>{
    dispatch(updated(product))
    nav("/admin/"+product.id)
  }
  return (
    <div className="">
      <form action="" onSubmit={handlesubmit} className="form">
        <div className="inputs">
        <input type="text" placeholder="size" />
        <input type="text" placeholder="name" />
        <input type="text" placeholder="color" />
        <input type="text" placeholder="quantity" />
        <input type="text" placeholder="price" />
        <input type="file" id="file" hidden/>
        </div>
        <label htmlFor="file">add Photo</label>
        <button>add product</button>
      </form>
      <div className="products">
        <div className="content">

        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="img">
              <img src={product.img} alt="" />
              </div>
              <div className="text">

              <p>{product.name}</p>
              <p>{product.quan}</p>
              <div className="detail">
              <p>{product.size}</p>
              <p>{product.color}</p>
              <button onClick={()=>deleteitem(product.id)}>delete</button>
              <button onClick={()=>updateitem(product)}>update</button>
              </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
