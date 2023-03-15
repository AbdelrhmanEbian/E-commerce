import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  selected:[],inc:false,
  details:{},
  updated:{},
  products:[]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
      addtocart:(state,{payload})=>{
        state.value ++
        const newPayload = { ...payload, count: 1 };
        const arr = state.selected.length === 0
        ? [newPayload]
        : state.selected.map(select => {
            if (select.id === newPayload.id){
            state.inc=false
    return { ...select, count: select.count + 1 }}
        else{ 
            state.inc=true
            return select    }
        });
        state.selected.length !== 0 && state.inc && arr.push(newPayload)
        state.selected=arr
        state.inc=false
    
    },
    details:(state,{payload})=>{
        state.details=payload
    },
    updated:(state,{payload})=>{
        state.updated=payload
    },
    removeitem:(state,{payload})=>{
      state.selected=state.selected.filter(select =>{
       return select.id !== payload 
      })
      let count=0
      state.selected.map(product =>{
        count+=product.count
      })
      state.value=count
    },
    setproducts:(state,{payload})=>{

      state.products=payload
    },
    setvalue:(state)=>{
      state.value=0 
    },
    

  },
})

export const {addtocart,details,updated,removeitem ,setproducts} = counterSlice.actions

export default counterSlice.reducer
