import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import authService from './authService';
import Cookies from 'cookies-js';
import { toast } from 'sonner';

const initialState = { 
    user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')): null,
    allUsers: [],
    userData: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
 }
 export const getAllUsers = createAsyncThunk('auth/all-users', async (id, thunkAPI) => {
    try {
        console.log('hello');

        return await authService.getAllUsers();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const getCurrentUser = createAsyncThunk('auth/get-logged-user', async (thunkAPI) => {
    try {
        console.log('hello')

        return await authService.getCurrentUser();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })
 export const fetchUserData = createAsyncThunk('auth/get-logged-user', async (id, thunkAPI) => {
    try {
        console.log('hello')

        return await authService.fetchUserData(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await authService.login(user);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })

 export const register = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await authService.register(user);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }

 })
 export const logout = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await authService.logout(user);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 })
 export const forgotPassword = createAsyncThunk('auth/forgot-password', async (user, thunkAPI) => {
    try {
        console.log('hello')

        return await authService.forgotPassword(user);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 })
 export const resetPassword = createAsyncThunk('auth/reset-password', async (data, thunkAPI) => {
    try {

        return await authService.resetPassword(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }

 })
 
 export const updateUser = createAsyncThunk('auth/update-user', async (data, thunkAPI) => {
    
    try {

        return await authService.updateUser(data);
        
    } catch (error) {

        return thunkAPI.rejectWithValue(error);
        
    }

 });
 export const resetState = createAction('Reset-all');
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder ) => {
     builder
    .addCase(getAllUsers.pending,(state) => {state.isLoading = true }  )

    .addCase(getAllUsers.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.allUsers = action?.payload;
        // if (state?.isSuccess) {
        //     toast.success("Verification Done Successfully")
        // }
    })

    .addCase(getAllUsers.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.allUsers = null;
        if (state?.isError) {
            toast.error("Something Went Error")
        }
    })



     .addCase(fetchUserData.pending,(state) => {state.isLoading = true }  )

    .addCase(fetchUserData.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.userData = action?.payload;
        // if (state?.isSuccess) {
        //     toast.success("Verification Done Successfully")
        // }
    })

    .addCase(fetchUserData.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.userData = null;
        if (state?.isError) {
            toast.error("Something Went Error")
        }
    })




     .addCase(login.pending,(state) => {state.isLoading = true }  )

    .addCase(login.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.user = action?.payload;
        if (state?.isSuccess) {
            toast.success("Verification Done Successfully")
        }
    })

    .addCase(login.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        if (state?.isError) {
            toast.error("Something Went Error")
        }
    })


    .addCase(register.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(register.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.user = action?.payload;
        if (state?.isSuccess) {
            toast.success("User Created Successfully")
        }
    })

    .addCase(register.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        if (state?.isError) {
            toast.error("Something Went Error")
        }
    }) 


    .addCase(logout.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(logout.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.user = action?.payload;
    })

    .addCase(logout.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        if (state?.isError) {
            toast.error("Something Went Error")
        }
    }) 



    .addCase(forgotPassword.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(forgotPassword.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.token = action?.payload;
        if (state?.isSuccess) {
            toast.success("Email Send Successfully")
        }
    })

    .addCase(forgotPassword.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.token = null;
        if (state?.isError) {
            toast.error("Something Went Error")
        }
    })
    
    



    .addCase(resetPassword.pending,(state) => {state.isLoading = true }  )
    
    
    .addCase(resetPassword.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false;
        state.isSuccess = true;
        state.token = action?.payload;
        if (state?.isSuccess) {
            toast.success("Email Send Successfully")
        }
    })

    .addCase(resetPassword.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.token = null;
        if (state?.isError) {
            toast.error("Something Went Error")
        }
    })


    .addCase(updateUser.pending,(state) => {state.isLoading = true }  )
    
     
    .addCase(updateUser.fulfilled,(state, action) => {
        state.isLoading = false ;
        state.isError = false ;
        state.isSuccess = true;
        state.user = action?.payload;
        if (state?.isSuccess) {
            toast.success('User Updated successfully')
        }
    })

    .addCase(updateUser.rejected,(state, action) => {
        state.isLoading = false ;
        state.isError = true;
        state.isSuccess = false;
        state.updatedUser = null;
        state.message = action.error;
        if (state?.isError) {
            toast.error('Something went error')
        }
    })




    .addCase(resetState, () => initialState)



    },
});



export default authSlice.reducer;


