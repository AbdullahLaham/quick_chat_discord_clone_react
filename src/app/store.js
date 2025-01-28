import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import messageReducer from '../features/message/messageSlice';
import serverReducer from '../features/server/serverSlice';
import uploadReducer from '../features/upload/uploadSlice';
import channelReducer from '../features/channel/channelSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    uploads: uploadReducer,
    server: serverReducer,
    channel: channelReducer,
  },
});


