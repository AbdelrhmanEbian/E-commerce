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
  const [products, setproducts] = useState([]);
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
              where("name", "==", item.toLowerCase())
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

  return (
    <div className="home">
      <div className="first">
        <h3> Men Fashion</h3>
        <p>
          Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet
          amet amet ndiam elitr ipsum diam
        </p>
      </div>
      <div className="container">

        <div className="features my-4">
          <h1>CATEGORIES
 </h1>
 <div className="content">

          <div className="card bg-light text-dark " onClick={(e) => search(e)}>
            <div className="img">
              <img src="../img/product-1.jpg" alt="" />
            </div>
            <p>Shirt</p>
          </div>
          <div className="card bg-light text-dark" onClick={(e) => search(e)}>
            <div className="img">
              <img src="../img/product-2.jpg" alt="" />
            </div>

            <p>T-shirt</p>
          </div>
          <div className="card bg-light text-dark" onClick={(e) => search(e)}>
            <div className="img">
              <img src="../img/product-3.jpg" alt="" />
            </div>
            <p>Jeans</p>
            </div>
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/product-4.jpg" alt="" />
              </div>
              <p> Jacket</p>
            </div>
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/product-5.jpg" alt="" />
              </div>

              <p> Mobiles</p>
            </div>
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/product-6.jpg" alt="" />
              </div>

              <p> Laptops</p>
            </div>
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/product-8.jpg" alt="" />
              </div>
              <p> Shoes</p>
            </div>
            <div className="card bg-light text-dark" onClick={(e) => search(e)}>
              <div className="img">
                <img src="../img/product-9.jpg" alt="" />
              </div>

              <p> All</p>
            </div>
 </div>
          </div>

        <div className="products">
          <h2>PRODUCTS</h2>
          <div className="content text-centre">

          { error? <div>
            <h2>nothing was found</h2>
            
          </div>
          :
          products.map((product) => {
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
              </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
