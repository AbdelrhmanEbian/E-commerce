import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { db, st } from "../firebase";
import { details } from "../redux/slice";
function Home() {
  const [products, setproducts] =useState([]);
  const dispatch=useDispatch()
  const p= useSelector(state => state.products)
  useEffect(()=>{
    setproducts(p)
  },[p])
  
  const[error,seterror]=useState(false)
  const nav = useNavigate();
  const search = async (e) => {
    const item = e.target.outerText;
    try {
      const q =
        item === "All"
          ? collection(db, "products")
          : query(
              collection(db, "products"),
              where("cat", "==", item.toLowerCase())
            );
      const querySnapshot = await getDocs(q);
      const promises = querySnapshot.docs.map(async (doc) => {
        const storage = ref(st, `images/${doc.id}`);
        const url = await getDownloadURL(storage);
        return { ...doc.data(), id: doc.id, img: url };
      });
      const arr = await Promise.all(promises);
        if(arr.length === 0){ seterror(true)}else {setproducts(arr)
           seterror(false);}
          } catch (error) {

          }
  };
  const detailsarr = async (product) => {
    dispatch(details(product));
    nav("/product/" + product.id);
  };
  const load= products.length === 0? "content load":"content"
  return (
    <div className="home">
     <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <div className="first">
        <h3> Men Fashion</h3>
        <p>
          Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet
          amet amet ndiam elitr ipsum diam
        </p>
      </div>    </div>
    <div className="carousel-item">
    <div className="first">
        <h3> Men Fashion</h3>
        <p>
          Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet
          amet amet ndiam elitr ipsum diam
        </p>
      </div>    </div>
    <div className="carousel-item">
    <div className="first">
        <h3> Men Fashion</h3>
        <p>
          Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet
          amet amet ndiam elitr ipsum diam
        </p>
      </div>    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      
      <div className="container">

        <div className="features my-4">
          <h1>CATEGORIES
 </h1>
 <div className="content">
          <div className="card bg-light text-dark " onClick={(e) => search(e)}>
            <div className="img">
              <img src="../img/th (7).jpg" alt="" />
            </div>
            <p>Shirts</p>
          </div>
          <div className="card bg-light text-dark" onClick={(e) => search(e)}>
            <div className="img">
              <img src="../img/th (6).jpg" alt="" />
            </div>

            <p>T-shirts</p>
          </div>
          <div className="card bg-light text-dark" onClick={(e) => search(e)}>
            <div className="img">
              <img src="../img/th (8).jpg" alt="" />
            </div>
            <p>Jeans</p>
            </div>
            
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/cat-3.jpg" alt="" />
              </div>
              <p> Shoes</p>
            </div>
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/th (2).jpg" alt="" />
              </div>
              <p> Jackets</p>
            </div>
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/th (9).jpg" alt="" />
              </div>

              <p> All</p>
            </div>
 </div>
          </div>

        <div className="products">
          <h2>PRODUCTS</h2>
          <div className={load}>

          { error? <div>
            <h2>Items wasn't found</h2>
          </div>
          :
          products.length>0 ? products.map((product) => {
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
          }): ( <div className="loader-container">
      	  <div className="spinner"></div>
        </div>)}

              </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
