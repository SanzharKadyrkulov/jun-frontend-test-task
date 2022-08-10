import { configureStore } from '@reduxjs/toolkit';
import { raceDataReducer } from './slices/raceData.slice';
import { socketReducer } from './slices/socketSlice';

export const store = configureStore({
	reducer: { raceData: raceDataReducer, socket: socketReducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
