import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import uploadService from './uploadService'


const initialState = { 
    images:  [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const uploadImage = createAsyncThunk('upload/upload-images', async (data,thunkAPI) => {
    try {
        console.log('hello', data);
        const formData = new FormData();
        // data.forEach((element, i) => {
        //     return 
            
        // });
        formData.append("images", data[0]);
        console.log('hello', formData, data[0]);
        return await uploadService.uploadImage(formData);
        
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


 

 export const deleteImage = createAsyncThunk('upload/delete-images', async (id, thunkAPI) => {
    try {
        return await uploadService.deleteImage(id);
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 });

 export const resetState = createAction('Reset-all');

const uploadSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
        builder

        .addCase(uploadImage.pending,(state) => {state.isLoading = true }  )

        .addCase(uploadImage.fulfilled,(state, action) => {
            state.isLoading = false ;
            state.isError = false ;
            state.isSuccess = true;
            state.images = action?.payload;
        })

        .addCase(uploadImage.rejected,(state, action) => {
            state.isLoading = false ;
            state.isError = true;
            state.isSuccess = false;
            state.images = null;
            // state.message = action.error;
        })



        .addCase(deleteImage.pending,(state) => {state.isLoading = true }  )
    
        .addCase(deleteImage.fulfilled,(state, action) => {
            state.isLoading = false ;
            state.isError = false ;
            state.isSuccess = true;
            state.images = [];
        })

        .addCase(deleteImage.rejected,(state, action) => {
            state.isLoading = false ;
            state.isError = true;
            state.isSuccess = false;
            state.images = null;
            // state.message = action.error;
        })

        .addCase(resetState, () => initialState)

    },
});
export default uploadSlice.reducer;


