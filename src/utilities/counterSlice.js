import {createSlice, nanoid} from "@reduxjs/toolkit";


export const counterSlice= createSlice(
    {
    name:'counter',
    initialState:
    {
        tasks:[]
    },
    reducers: {
        storeTask: (state,action) => {
            const tasks={id:nanoid(),task:action.payload}//create an object
            state.tasks.push(tasks);
        },
        deleteTask: (state,action) => {
           console.log(action.payload) // Extract task ID to remove
           const id= state.tasks.map((task)=>
           {
               return task.id;
           })
            console.log(id)
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            console.log(state.tasks);
        }
    },

    }
)
export const {storeTask,deleteTask} =counterSlice.actions
export default counterSlice.reducer;