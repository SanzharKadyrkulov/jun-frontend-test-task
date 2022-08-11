import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import './App.css';
import { openSocket } from './store/slices/socketSlice';
import MainPage from './pages/MainPage';
import { Box } from '@mui/material';

const socket = io(process.env.REACT_APP_API);

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
