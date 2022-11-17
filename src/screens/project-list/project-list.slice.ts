import { createSlice } from "@reduxjs/toolkit";


interface State {
    projectModalOpen: boolean;
}

const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name:'projectLiseSlice',
    initialState,
    reducers: {
        openProjectModal(state){
            state.projectModalOpen = true
        },
        closeProjectModal(state, action){
            state.projectModalOpen = false
        }
    }
})