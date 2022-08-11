import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

let itemStyle = {
	p: 2,
	backgroundColor: '#1c3247',
	color: '#e6e9ef',
	textTransform: 'uppercase',
	marginBottom: '1px',
	fontWeight: 'semi-bold',
	borderRadius: '5px',
	'&:last-child': {
		mb: 0,
	},
};

const Table = () => {
	const {
		raceData: { tick, resultList },
	} = useSelector((state) => state);

	const mergeList = (tick, resultList) => {
		const resultListNames = resultList.map((horse) => horse.name);
		const rest = tick
			.filter((horse) => !resultListNames.includes(horse.name))
			.sort((a, b) => b.distance - a.distance);
		const mergedList = [...resultList, ...rest];

		return mergedList;
	};

	return (
		<Paper
			elevation={3}
			sx={{
				width: '200px',
				textAlign: 'center',
				mr: 1,
				backgroundColor: 'transparent',
				height: 'min-content',
			}}
		>
			{[...mergeList(tick, resultList)].map((horse, index) => (
				<Box sx={itemStyle} key={horse.name}>
					<Typography
						variant='h4'
						sx={!index && { color: '#FFD700', fontWeight: 'bold' }}
					>
						{index + 1}
					</Typography>
					{horse.name}
				</Box>
			))}
		</Paper>
	);
};

export default Table;
