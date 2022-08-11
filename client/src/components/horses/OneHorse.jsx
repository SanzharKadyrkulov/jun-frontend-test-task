import React, { useEffect, useState } from 'react';
import { Box, Slider, SliderThumb, Typography } from '@mui/material';
import { ReactComponent as Horse1 } from '../../assets/icons/race_horse1.svg';
import { ReactComponent as Horse2 } from '../../assets/icons/race_horse2.svg';
import { useSelector } from 'react-redux';

function AnimatedHorseComponent(props) {
	const { children, ...other } = props;
	const {
		raceData: { finished },
	} = useSelector((state) => state);
	const [counter, setCounter] = useState(0);

	const handleAnimation = () => {
		const timer = setInterval(() => {
			setCounter((prev) => prev + 1);
		}, 300);

		return timer;
	};

	useEffect(() => {
		let timer;

		if (!finished) timer = handleAnimation();

		return () => {
			if (timer) clearInterval(timer);
		};
	}, [finished]);

	return (
		<SliderThumb {...other}>
			{children}
			{counter % 2 ? <Horse1 /> : <Horse2 />}
		</SliderThumb>
	);
}

const OneHorse = ({ horse }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				p: 1,
				color: '#e6e9ef',
			}}
		>
			<Typography variant='h6'>{horse.name}</Typography>
			<Slider
				components={{
					Thumb: AnimatedHorseComponent,
				}}
				sx={{
					'& .MuiSlider-thumb': {
						borderRadius: '1px',
						backgroundColor: 'transparent',
						width: '50px',
						height: '50px',
						boxShadow: 'none',
						'&:before': {
							boxShadow: 'none',
						},
					},
				}}
				value={horse.distance}
				max={1000}
			/>
		</Box>
	);
};

export default OneHorse;
