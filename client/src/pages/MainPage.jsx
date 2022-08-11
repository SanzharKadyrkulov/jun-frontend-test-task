import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Confetti from 'react-confetti';
import HorsesList from '../components/horses/HorsesList';
import Table from '../components/Table';
import ResultsModal from '../components/ResultsModal';

const MainPage = () => {
	const {
		socket: { socket },
		raceData: { finished },
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
				<Confetti recycle={finished} numberOfPieces={80} />
				<ResultsModal />
				<Table />
				<HorsesList />
			</Box>
		</Container>
	);
};

export default MainPage;
