import React, { useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import ReactMapGL from 'react-map-gl';
import Marker from './Markers';
import './styles.css';

const Map = (props) => {
	console.log('Map - props', props);
	const mapRef = useRef();
	const [viewport, setViewport] = useState({
		width: 0,
		height: 0,
		latitude: 40.71502671373381,
		longitude: -73.97480043712007,
		zoom: 9.5,
	});

	useEffect(() => {
		const height = mapRef.current.clientHeight;
		const width = mapRef.current.clientWidth;
		setViewport({
			...viewport,
			width,
			height,
		});
	}, [props.activeParks]);

	const handleViewPort = (nextViewport) => {
		console.log('handleViewPort', nextViewport);
		setViewport(nextViewport);
	};

	const markers = () => {
		return props.activeParks.map((park, index) => (
			<Marker
				key={index}
				park={park}
				isShowing={props.activeParks.includes(park)}
			/>
		));
	};

	return (
		<div id='boroughs-map' ref={mapRef}>
			<ReactMapGL
				mapboxApiAccessToken={"pk.eyJ1Ijoiamtlb2hhbiIsImEiOiJja2kyYXpxNTgwcXV1MzNuNWJ4YjdlN2N6In0.NVEwpt2bmK0FDjQFGk1UMA"}
				// mapboxApiAccessToken={process.env.REACT_APP_MAPBOXACCESSTOKEN}
				// mapStyle='mapbox://styles/mapbox/satellite-v9'
				mapStyle='mapbox://styles/mapbox/light-v9'
				// mapStyle='mapbox://styles/mapbox/dark-v9'
				// mapStyle='mapbox://styles/mapbox/streets-v9'
				// mapStyle='mapbox://styles/shihab-bounce/cjxvmqu4a6hzu1cocdsdfw9ln'
				{...viewport}
				onViewportChange={(nextViewport) => handleViewPort(nextViewport)}>
				{markers()}
			</ReactMapGL>
		</div>
	);
};

export default Map;

/* 

REFERENCES

ARTICLES:
- https://levelup.gitconnected.com/getting-started-with-react-and-mapbox-gl-js-setting-map-markers-from-an-api-513c2570c6f3
- https://medium.com/swlh/intro-to-react-mapbox-gl-js-b163aef4d0bd

DOCS: 
- react-map-gl: https://visgl.github.io/react-map-gl/docs/get-started/get-started
- mapbox: https://docs.mapbox.com/mapbox-gl-js/example/setstyle/

VIDEOS:
- 

ISSUES/RESOLUTION

ISSUE: markers being translated too much on X/Y cords that they aren't visible
<div class="mapboxgl-marker " style="position: absolute; left: 0px; top: 0px; transform: translate(1432.22px, 1336.11px); cursor: auto;"><img src="pin.png"></div>
CAUSE: was using parseInt instead of parseFloat
RESOLUTION: use parseFloat

ISSUE: Unable to use font-awesome <i> icons...if they are included in the markers then the entire map including input/dropdown no longer render. 
CAUSE:
RESOLUTION: 

*/

// const Map = (props) => {
// 	console.log('Map - props', props);
// 	let [{ data }] = useDataApi(url, []);
// 	const svgRef = useRef();
// 	const projRef = useRef(d3.geoMercator().center([-73.93, 40.72]).scale(57500));

// 	useEffect(() => {
// 		const height = svgRef.current.clientHeight;
// 		const width = svgRef.current.clientWidth;
// 		projRef.current.translate([width / 2, height / 2]);
// 	}, [data]);

// 	// useEffect(() => {
// 	//   renderParks(props.activeParks);
// 	// }, [props.activeParks]);

// 	const renderChart = () => {
// 		const path = d3.geoPath().projection(projRef.current);
// 		return data[0].features.map((d, i) => {
// 			const featurePath = path(d);
// 			return (
// 				<path
// 					key={i}
// 					d={featurePath}
// 					className={d.properties.name}
// 					fill={boroughLegend(d.properties.borough)}
// 				/>
// 			);
// 		});
// 	};

// 	const renderParks = (parks) => {
// 		const circles = d3
// 			.select(svgRef.current)
// 			.selectAll('.parks')
// 			.data(parks, (d) => d.name);

// 		circles
// 			.enter()
// 			.append('circle')
// 			.attr(
// 				'transform',
// 				(d) => `translate(${projRef.current([+d.lon, +d.lat])})`
// 			)
// 			.attr('r', 4)
// 			.attr('class', (d, i) => `parks park-${d.code}`)
// 			.style('fill', (d) => d.color)
// 			.style('opacity', 0)
// 			.transition()
// 			.duration(500)
// 			.style('opacity', 1);

// 		circles.exit().transition().duration(500).style('opacity', 0).remove();
// 	};

// 	return (
// 		<svg id='boroughs-map' ref={svgRef}>
// 			{data.length && renderChart()}
// 			{props.activeParks && <Circles {...props} projection={projRef.current} />}
// 		</svg>
// 	);
// };

// export default Map;
