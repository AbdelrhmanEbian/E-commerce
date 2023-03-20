import React, { useState, useEffect, lazy, Suspense } from 'react'
import './index.css'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { app } from './firebase';
import { useSelector,useDispatch } from 'react-redux';
import Navbar from './components/navbar';
import Home from './components/Home';
import { db, st } from "./firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDownloadURL, ref } from "firebase/storage";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { setproducts } from './redux/slice';
import Login from './components/Login';
import Admin from './components/Admin';
import Details from './components/Details';
import Update from './components/update';
import Shopping from './components/shopping';


const App = () => {
  const [user, setUser] = useState({})
  const [play, setPlay] = useState(false)
  const dispatch=useDispatch()
  const p=useSelector(state=>state.products)
  const[products,setproductss]=useState([])
  useEffect(()=>{
    setproductss(p)
  },[p])
  let auth = getAuth(app)
  const { selected } = useSelector(state => state)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          id: user.uid
        })
        setPlay(true)
      }else{
        setUser({})
        setPlay(true)
      }
    })
    return () => unsub()
  }, [])
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      try {
        const promises = snapshot.docs.map(async (doc) => {
          return new Promise(async(resolve) => {
              const storageRef = ref(st, `images/${doc.id}`);
              const url = await getDownloadURL(storageRef);
              resolve({ ...doc.data(), id: doc.id, img: url });
            });
          });
          Promise.all(promises).then((products) => {
            dispatch(setproducts(products));
          });
        } catch (error) {
        }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar user={user}/>
          <Routes>
            <Route path='/' element={play ?Object.keys(user).length > 0 ? <Home/>:<Login/> : (
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
      )  } />
            <Route path='/login' element={<Login />}/>
{ user.email==="abdelrhmanebian@gmail.com" &&<Route path='/admin' element={<Admin/>} />}     
       <Route path='/admin/:id' element={<Update />} />
            <Route path='/product/:id' element={<Details />} />
            <Route path='/shopping' element={selected.length === 0 ? <Home /> : <Shopping />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
