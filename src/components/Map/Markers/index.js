import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useSpring, animated } from 'react-spring';

const Icon = ({ park, isShowing }) => {
	const style = useSpring({
		config: {
			duration: 500,
		},
		opacity: isShowing ? 1 : 0,
	});

	const styles = {
		borderRadius: '50%',
		backgroundColor: 'blue',
		width: '10px',
		height: '10px',
	};

	return (
        <Marker 
            longitude={parseFloat(park.lon)} latitude={parseFloat(park.lat)}>
			<div style={{ ...styles, backgroundColor: park.color }}></div>
		</Marker>
        // 	<Marker longitude={parseFloat(park.lon)} latitude={parseFloat(park.lat)}>
		// 	<div style={{ ...style, backgroundColor: park.color }}></div>
		// </Marker>
	);
};

export default Icon;
