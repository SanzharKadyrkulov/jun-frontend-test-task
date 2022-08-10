const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	socket: null,
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		openSocket: (state, action) => {
			state.socket = action.payload;
		},
	},
});

export const socketReducer = socketSlice.reducer;
export const { openSocket } = socketSlice.actions;
