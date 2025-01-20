import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import serverReducer from '../features/server/serverSlice';
import uploadReducer from '../features/upload/uploadSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    uploads: uploadReducer,
    server: serverReducer,
    // message: messageReducer,
  },
});


