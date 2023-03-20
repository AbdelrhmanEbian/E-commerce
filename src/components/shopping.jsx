import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { removeitem, setbought, setselected } from '../redux/slice';
import { setvalue } from '../redux/slice';

function Shopping() {
    const {selected}=useSelector(state=>state)
    const {value}=useSelector(state=>state)
    const [total,settotal]=useState(0)
    const dispatch=useDispatch()
    const nav=useNavigate()
    useEffect(()=>{
      let arr=0
      selected.map(product=>{
         arr=(arr) + (product.count) * parseInt((product.price))
      })
      settotal(arr)
    })

      if (selected.length === 0) {
        nav('/')
      }
    const buy=()=>{
        selected.map( async(product)=>{
            const document=doc(db,"products",product.id)
            const minus=product.quan-product.count
            if (minus === 0) {
             await deleteDoc(document)
            }else{

              await updateDoc(document,{
                quan:product.quan-product.count
              })
            }
        })
        setTimeout(()=>{
            nav('/')
        })
        dispatch(setvalue())
        dispatch(setbought(selected))
        dispatch(setselected())
    }
    const remove=(id)=>{
      dispatch(removeitem(id))
    }
  return (
    <div className='table'>
      <table>
    <thead >
      <tr className='list head'>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
        {selected.map((product) => {
          return (
            <tr className="list prod" key={product.id}>
              <td>
              <div className="img">
              <img src={product.img} alt="" />
              </div>
                {product.name}
                </td>
              <td>{product.price}</td>
              <td>{product.count}</td>
              <td>{(product.count)* parseInt((product.price))}</td>
              <td className='text-danger fw-bold remove' onClick={()=>remove(product.id)}>Remove</td>
            </tr>
          )
        })}
              </tbody>
          </table>
          <div className="check">
          <h2>CART SUMMARY</h2>
          <div className="count">
            <h3>items quantity</h3>
            <p>{value}</p>

          </div>
          <div className="total">
      <h3>Total</h3>
      <p>{total}</p>
          </div>
          <button onClick={buy}>procced to checkout</button>
          </div>
    </div>
  )
}

export default Shopping
