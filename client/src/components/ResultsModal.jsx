import { Button, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFinished, setResultList } from '../store/slices/raceData.slice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: 'rgba(35, 46, 75, 1)',
	color: 'white',
	borderRadius: '5px',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
	textAlign: 'center',
};

const ResultsModal = () => {
	const {
		socket: { socket },
		raceData: { resultList, finished },
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const startNewRound = () => {
		// since we disconnect the socket, we should reconnect it
		socket.connect();
		socket.emit('start');
	};

	const setDefaultValues = () => {
		dispatch(setFinished(false));
		dispatch(setResultList([]));
	};

	const handleClose = () => {
		setDefaultValues();
		startNewRound();
	};

	return (
		<Box>
			<Modal
				open={finished}
				aria-labelledby='parent-modal-title'
				aria-describedby='parent-modal-description'
			>
				<Box sx={{ ...style }}>
					<Typography variant='h4' id='parent-modal-title'>
						Results
					</Typography>
					{resultList.map((item, index) => (
						<Typography
							variant='subtitle1'
							key={item.name}
							id='parent-modal-description'
							sx={
								index === 0
									? {
											my: 2,
											fontWeight: 'bold',
											color: '#FFD700',
											fontSize: '1.2em',
									  }
									: { my: 2 }
							}
						>
							{index + 1} place: {item.name}
						</Typography>
					))}

					<Button
						onClick={() => {
							handleClose();
						}}
						variant='contained'
					>
						New round
					</Button>
				</Box>
			</Modal>
		</Box>
	);
};

export default ResultsModal;
