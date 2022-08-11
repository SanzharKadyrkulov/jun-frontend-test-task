import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setFinished,
	setResultList,
	setTick,
} from '../../store/slices/raceData.slice';
import OneHorse from './OneHorse';

const HorsesList = () => {
	const {
		raceData: { tick },
		socket: { socket },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const findRestHorses = (finishedHorses, horses) => {
		const finishedHorseNames = finishedHorses.map((horse) => horse.name);
		const restHorses = [];
		horses.forEach((horse) => {
			if (!finishedHorseNames.includes(horse.name)) {
				restHorses.push(horse);
			}
		});

		return restHorses;
	};

	const findFinishers = (horses) => {
		const finishers = horses.filter((horse) => horse.distance === 1000);

		if (finishers.length > 0) {
			return finishers;
		}

		return null;
	};

	const checkAllFinished = (horses) => {
		const finished = horses.every((horse) => horse.distance === 1000);

		return finished;
	};

	const listenTickerAndCalculateResult = () => {
		let result = [];

		socket.on('ticker', (data) => {
			dispatch(setTick(data));

			const notFinished = findRestHorses(result, data);
			const finishers = findFinishers(notFinished);
			if (finishers) {
				result.push(...finishers);
			}

			if (checkAllFinished(data)) {
				dispatch(setResultList(result));

				result = [];

				// disconnecting cuz server has no message type to stop ticker
				socket.disconnect();
				dispatch(setFinished(true));
			}
		});
	};

	useEffect(() => {
		if (socket) {
			socket.emit('start');
			listenTickerAndCalculateResult();
		}
	}, [socket]);
	return (
		<Box
			sx={{
				flexGrow: 1,
				textAlign: 'center',
				backgroundColor: '#243d57',
				height: 'min-content',
				borderRadius: '5px',
				padding: '0 15px',
			}}
		>
			{tick.length > 0 ? (
				tick.map((horse) => <OneHorse horse={horse} key={horse.name} />)
			) : (
				<CircularProgress />
			)}
		</Box>
	);
};

export default HorsesList;
