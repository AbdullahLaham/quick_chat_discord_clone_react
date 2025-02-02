import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import Cookies from 'cookies-js';
import { toast } from 'sonner';
import serverService from './serverService';


const initialState = { 
    servers: [],
    currentServer: {},
    currentServerMember: {},
    invitedServer: {},
    newServer: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }



export const getServers = createAsyncThunk('servers/', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await serverService.getServers(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })
 
 

 
export const createServer = createAsyncThunk('servers/new-server', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await serverService.createServer(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


  
export const getCurrentServer = createAsyncThunk('servers/:serverId', async (data, thunkAPI) => {
    try {
        console.log('hello');

        return await serverService.getCurrentServer(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const getInvitedServer = createAsyncThunk('servers/invite-server/:invite-code', async (inviteCode, thunkAPI) => {
    try {
        console.log('hello');

        return await serverService.getInvitedServer(inviteCode);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const getCurrentServerMember = createAsyncThunk('servers/:serverId', async (serverId, thunkAPI) => {
    try {
        console.log('hello');

        return await serverService.getCurrentServerMember(serverId);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })


 export const leaveServer = createAsyncThunk('servers/leave-server', async (serverId, thunkAPI) => {
    try {
        console.log('hello');

        return await serverService.leaveServer(serverId);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })




 
 export const resetState = createAction('Reset-all');
const brandSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder

    .addCase(getServers.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getServers.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.servers = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(getServers.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.postedQuery = null;
        state.messages = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })







    .addCase(createServer.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(createServer.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.newServer = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(createServer.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.currentMessage = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })






    .addCase(getCurrentServer.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getCurrentServer.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.currentServer = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(getCurrentServer.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.chats = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })

    .addCase(getInvitedServer.pending,(state) => {state.isLoading = true }  )
   
     
    .addCase(getInvitedServer.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.invitedServer = action?.payload;
        // if (state?.isSuccess === true) {
        //     toast.success("Contact Form Submitted Successfully")
        // }
    })

    .addCase(getInvitedServer.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.invitedServer = null;
        state.message = action.error;
        if (state?.error === true) {
            toast.error("Some thing went wrong")
        }
    })



    .addCase(resetState, () => initialState)
    },
});
export default brandSlice.reducer;


