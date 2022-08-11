const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	tick: [],
	resultList: [],
	finished: false,
};

const raceDataSlice = createSlice({
	name: 'raceData',
	initialState,
	reducers: {
		setTick: (state, action) => {
			state.tick = action.payload;
		},
		setResultList: (state, action) => {
			state.resultList = action.payload;
		},
		setFinished: (state, action) => {
			state.finished = action.payload;
		},
	},
});

export const raceDataReducer = raceDataSlice.reducer;
export const { setTick, setResultList, setFinished } = raceDataSlice.actions;
