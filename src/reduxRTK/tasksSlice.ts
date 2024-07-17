import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./storeRTK";


export interface ITaskFetch {
  userId: number,
id: number,
title: string,
completed: boolean
}


export interface ITask {
  id: number
  title: string;
  isCompleted: boolean;
  updatedAt: Date;
}



export interface TaskState {
    tasks:ITask[];
    status: 'loading' | 'success' | 'error';
}

const initialState: TaskState = {
  tasks:[],
  status:'loading'
  
};

 export const sortByDate = (arr: ITask[]) => {
  return arr.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

export const fetchTodos = createAsyncThunk<ITask[], void, { state: RootState }>('tasks/fetchTodos', async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const data = await response.json();
  // console.log(data);
  return sortByDate(
      data
        .splice(0, 10)
        .map((e: {id:number, title: string, completed: boolean }) => ({
          id:e.id,
          title: e.title,
          isCompleted: e.completed,
          updatedAt: new Date(
            Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
          ),
        }))
    )
  });


const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((_, index) => index !== action.payload);
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      if (
        state.tasks[action.payload.id].title !== action.payload.title ||
        state.tasks[action.payload.id].isCompleted !==
          action.payload.isCompleted
      ) {
        state.tasks = sortByDate(
          state.tasks.map((e, index) =>
            index === action.payload.id ? action.payload : e
          )
        );
      }
    },
  },
    
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status= 'loading';
    
      })
      .addCase(fetchTodos.fulfilled, (state, action:PayloadAction<ITask[]>) => {
        state.tasks = action.payload;
        state.status= 'success';
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status= 'error';
      });
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;


