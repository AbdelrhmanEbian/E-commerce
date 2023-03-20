import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, st } from "../firebase";
import { useDispatch, useSelector } from 'react-redux';
import { updated ,setproducts, setbought} from "../redux/slice";
import { nanoid } from "@reduxjs/toolkit";

function Admin() {
  const [products, setproductss] = useState([]);
  const p= useSelector(state=>state.products)
  const bought=useSelector(state=>state.bought)
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
    const cat=e.target[5].value
    const file = e.target[6].files[0];
    const refg = collection(db, "products");
    try {
      const id=nanoid()
      const storage = ref(st, "images/" +id);
      await uploadBytesResumable(storage, file);
      await setDoc(doc(refg,id), {
        name: name,
        size: size,
        color: color,
        quan: quan,
        cat:cat,
        price:price
      });
    } catch (error) {
    }
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
  const handle=(id)=>{
    const arr=bought.map(product=>{
      return product.id === id ?{...product,accept:"accepted"}:product
    })
    dispatch(setbought(arr))
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
        <select name="catoegry"  id="cat">
          <option value="shirts">Shirts</option>
          <option value="t-shirts">T-shirts</option>
          <option value="jeans">Jeans</option>
          <option value="shoes">Shoes</option>
          <option value="jackets">Jackets</option>
        </select>
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
      {bought.length > 0 && <div className="order">
      <div className="products">
      <h2>Orders</h2>

        <div className="content">

        {bought.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="img">
              <img src={product.img} alt="" />
              </div>
              <div className="text">

              <p>{product.name}</p>
              <p>{product.count}</p>
              <div className="detail">
              <p>{product.size}</p>
              <p>{product.color}</p>
              <button onClick={()=>handle(product.id)}>submit</button>
              {product.accept&&<p>{product.accept}</p>}
              </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      </div>}
    </div>
  );
}

export default Admin;
