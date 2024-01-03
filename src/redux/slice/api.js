import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchShops = createAsyncThunk("fetchShops",async()=>{
    const response= await fetch('https://fakestoreapi.com/products')
    return response.json()
})

const shopSlice = createSlice({
    name:'shop',
     initialState : {
        isLoading:false,
        data:null,
        isError:false,
     },
     extraReducers:(builder)=>{
        builder.addCase(fetchShops.pending,(state,action)=>{
            state.isLoading=true; 
            state.data=action.payload;
            state.isError=false;
        })
builder.addCase(fetchShops.fulfilled, (state,action)=>{
state.isLoading=false;
state.data=action.payload;
state.isError=false;})

builder.addCase(fetchShops.rejected,(state,action)=>{
    console.log("error",action.payload);
    state.isError=true;
    state.data=action.payload;
    state.isLoading=false;
})

     }
});

export default shopSlice.reducer