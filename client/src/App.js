import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import './App.css';

const socket = io('http://localhost:3002');

function App() {
	useEffect(() => {
		socket.emit('start');

		socket.on('ticker', (data) => {
			console.log(data);
		});
	}, []);
	return <div>Hello World</div>;
}

export default App;
