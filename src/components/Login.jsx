import React, { useState } from 'react'
import { app ,db} from '../firebase'
import { getAuth ,GoogleAuthProvider,onAuthStateChanged,signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';


function Login() {
  const [error,seterror]=useState("")
  const [user,setuser]=useState({})
  const nav =useNavigate()
 const handlesubmit=async(e)=>{
  e.preventDefault()
  const auth=getAuth(app)
  const google= new GoogleAuthProvider()
  try {
   let user=await signInWithPopup(auth,google)
    setuser({
    name:user.user.displayName,
    email:user.user.email,
    id:user.user.uid
  })  
  nav('/')
  onAuthStateChanged(auth,user=>{
  })
} catch (error) {
    seterror(error.message)
  }
}
  return (
    <div className="login">
      <div className="content">

        <span className='logo'>Shopping App</span>
        <form action="" onSubmit={handlesubmit}>
          <button>sign in with Google</button>
        </form>
      </div>
    </div>
  )

  }
export default Login
