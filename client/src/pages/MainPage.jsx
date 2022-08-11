import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import HorsesList from '../components/horses/HorsesList';
import Table from '../components/Table';
import ResultsModal from '../components/ResultsModal';

const MainPage = () => {
	const {
		socket: { socket },
	} = useSelector((state) => state);

	useEffect(() => {
		if (socket) {
			socket.emit('start');
		}
	}, [socket]);

	return (
		<Container maxWidth='lg'>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					alignItems: 'center',
				}}
			>
				<ResultsModal />
				<Table />
				<HorsesList />
			</Box>
		</Container>
	);
};

export default MainPage;
