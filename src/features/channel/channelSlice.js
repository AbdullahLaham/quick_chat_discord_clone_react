import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import channelService from './channelService';
import Cookies from 'cookies-js';
import { toast } from 'sonner';


const initialState = { 

    channels: [],
    currentChannel: {},
    deletedChannel: {},
    updatedChannel: {},

    // chats: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }

 

 export const getCurrentChannel = createAsyncThunk('channel/get-channel', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await channelService.getCurrentChannel(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


export const getChannels = createAsyncThunk('channel/get-channels', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await channelService.getChannels();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })



 
export const createChannel = createAsyncThunk('channel/new-channel', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await channelService.createChannel(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })



 export const updateChannel = createAsyncThunk('channel/update-channel', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await channelService.updateChannel(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const deleteChannel = createAsyncThunk('channel/delete-channel', async (url, thunkAPI) => {
    try {
        console.log('hello');

        return await channelService.deleteChannel(url);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })



 
 export const resetState = createAction('Reset-all');
const brandSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder

    .addCase(getChannels.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getChannels.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.channels = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(getChannels.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.postedQuery = null;
        state.channels = [];
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })





    .addCase(getCurrentChannel.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getCurrentChannel.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentChannel = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(getCurrentChannel.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.postedQuery = null;
        state.currentChannel = {};
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })






    .addCase(createChannel.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(createChannel.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentChannel = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(createChannel.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentChannel = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })





    .addCase(deleteChannel.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(deleteChannel.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.deletedChannel = action?.payload;

        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(deleteChannel.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })







    .addCase(updateChannel.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(updateChannel.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.updatedChannel = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(updateChannel.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.updatedChannel = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })



    .addCase(resetState, () => initialState)
    },
});
export default brandSlice.reducer;


