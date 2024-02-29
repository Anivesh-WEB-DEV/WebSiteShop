import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchShops = createAsyncThunk('fetchShops', async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?skip=0&limit=100');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShops.pending, (state, action) => {
      state.isLoading = true;
      state.data = action.payload;
      state.isError = false;
    })
    builder.addCase(fetchShops.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    })

    builder.addCase(fetchShops.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
      state.data = action.payload;
      state.isLoading = false;
    })

  }
});

export default shopSlice.reducer