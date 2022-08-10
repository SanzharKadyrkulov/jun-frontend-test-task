import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTick, setResultList } from '../slices/raceData.slice';

const MainPage = () => {
	const {
		raceData: { tick, resultList },
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

			console.log(notFinished, 'notFinished');

			if (findFinishers(notFinished)) {
				console.log(findFinishers(notFinished), 'findFinishers');
				result.push(...findFinishers(notFinished));
			}

			if (checkAllFinished(data)) {
				dispatch(setResultList(result));

				result = [];

				// disconnecting cuz server has no massage for stop ticker
				socket.disconnect();
			}
		});
	};

	useEffect(() => {
		if (socket) {
			socket.emit('start');
			listenTickerAndCalculateResult();
		}
	}, [socket]);

	useEffect(() => {
		console.log(resultList);
	}, [resultList]);

	return <div>MainPage</div>;
};

export default MainPage;
