const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	tick: [],
	resultList: [],
};

const raceDataSlice = createSlice({
	name: 'horseData',
	initialState,
	reducers: {
		setTick: (state, action) => {
			state.horses = action.payload;
		},
		setResultList: (state, action) => {
			state.resultList = action.payload;
		},
	},
});

export const raceDataReducer = raceDataSlice.reducer;
export const { setTick, setResultList } = raceDataSlice.actions;
