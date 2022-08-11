import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { API } from './utils/consts';
import './App.css';
import { openSocket } from './store/slices/socketSlice';
import MainPage from './pages/MainPage';
import { Box } from '@mui/material';

const socket = io(API);

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(openSocket(socket));
	}, []);

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
			<MainPage />
		</Box>
	);
}

export default App;
