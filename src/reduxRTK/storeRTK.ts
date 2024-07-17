import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasksSlice";
import userReducer from "./usersSlice";

const storeRTK = configureStore({
    reducer:{
        taskList: taskReducer,
        userList: userReducer,
        
    }
})

export default storeRTK;

export type RootState = ReturnType<typeof storeRTK.getState>;
export type AppDispatch = typeof storeRTK.dispatch;