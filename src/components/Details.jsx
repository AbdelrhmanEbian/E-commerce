import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, st } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../redux/slice";

function Details() {
  const { id } = useParams();
  const details  = useSelector((state) => state.details);
  const [play,setplay]=useState(false)
  const nav=useNavigate()
  useEffect(()=>{

    if (Object.keys(details).length === 0) {
      nav('/')
    }else{
      setplay(true)
    }
  },[details])
  const dispatch = useDispatch();
  const [product, setproduct] = useState([]);
   const addcart = (product) => {
    dispatch(addtocart(product));
  };
  return (
   <div className="product-details">
      {!play ? <h2>...loading</h2>:
      <>
      <div className="img">
        <img src={details.img} alt="" />
      </div>
      <div className="card" key={details.id}>
        <h3>{details.name}</h3>
        <p className="price">{details.price}</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo modi
          tempora tempore quas velit consequatur, sunt iusto reiciendis voluptas
          impedit.
        </p>

        <p>size :<span>{details.size}</span></p>
        <p>color : <span>{details.color}</span></p>
        <button onClick={() => addcart(details)}>add to cart</button>
        </div>
      </>
      }
    </div>
  );
}

export default Details;
