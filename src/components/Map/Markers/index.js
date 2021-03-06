import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useSpring, animated } from 'react-spring';

const Markers = ({ park, isShowing }) => {
	const style = useSpring({
		config: {
			duration: 500,
		},
		opacity: isShowing ? 1 : 0,
	});

	const styles = {
		borderRadius: '50%',
		backgroundColor: 'blue',
		width: '7px',
		height: '7px',
	};

	return (
        <Marker 
            longitude={parseFloat(park.lon)} latitude={parseFloat(park.lat)}>
			<animated.div style={{ ...styles, backgroundColor: park.color }} />
		</Marker>
        // 	<Marker longitude={parseFloat(park.lon)} latitude={parseFloat(park.lat)}>
		// 	<div style={{ ...style, backgroundColor: park.color }}></div>
		// </Marker>
	);
};

export default Markers;
