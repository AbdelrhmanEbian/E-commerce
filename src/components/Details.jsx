import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, st } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../redux/slice";
import Slider from "react-slick";
import { details as detailsssss } from "../redux/slice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Details() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    cssEase: "linear",
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          infinite: true,
          dots: true,
          autoplay: true,

          autoplaySpeed: 2000,
          cssEase: "linear",
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          infinite: true,
          dots: true,
          autoplay: true,

          autoplaySpeed: 2000,
          cssEase: "linear",
          slidesToScroll: 1,
        }
      }]
  };
  
  const details  = useSelector((state) => state.details);
  const products  = useSelector((state) => state.products);
  const [like,setlike]=useState([])
  const [play,setplay]=useState(false)
  const also= products.filter(product=>{
    return product.cat === details.cat && product.id !== details.id
   })
  const nav=useNavigate()
  useEffect(()=>{
    setlike(also)
    if (Object.keys(details).length === 0) {
      nav('/')
    }else{
      setplay(true)
    }
  },[details])
  const dispatch = useDispatch();
   const addcart = (product) => {
    dispatch(addtocart(product));
  };
  const detailsarr = async (product) => {
    scroll(0,0)
    dispatch(detailsssss(product));
    nav("/product/" + product.id);
  };

  return (
    <div className="details">

   <div className="product-details" id="product">
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
    <div className="also">
{like.length >0 &&      <h2>You may like also</h2>}
     <Slider {...settings}>
      {
     like.map((product) => {
           return product.quan > 0 ? (
              <div
              className="product"
              key={product.id}
                onClick={() => detailsarr(product)}
              >
                <div className="img">

                <img src={product.img} alt="" />
                </div>
                <div className="text">

                <p> {product.name}</p>
                <p> {product.price}</p>
                <div className="detail">

                <p>{product.size}</p>
                <p>{product.color}</p>
                </div>
                </div>
              </div>
            ) : null;
          })}
     </Slider>
      
    </div>
      </div>
  );
}

export default Details;
