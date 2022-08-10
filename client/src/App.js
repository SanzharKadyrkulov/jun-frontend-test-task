import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { API } from './utils/consts';
import './App.css';
import { openSocket } from './store/slices/socketSlice';
import MainPage from './store/pages/MainPage';

const socket = io(API);

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(openSocket(socket));
	}, []);

	return (
		<div>
			<MainPage />
		</div>
	);
}

export default App;
