/*
ISSUE: Map not transitioning to new coords
RESOLUTION: Added FlyToInterpolator to the viewport
https://visgl.github.io/react-map-gl/docs/api-reference/fly-to-interpolator
import ReactMapGL, {FlyToInterpolator}  from 'react-map-gl';
  const transitionInterpolator = new FlyToInterpolator()
  const [viewport, setViewport] = useState({
  width: 0,
  height: 0,
  latitude: 40.71502671373381,
  longitude: -73.97480043712007,
  zoom: 9.5,
  transitionInterpolator,
  transitionDuration: 2000
});


ISSUE: if the user interacts with the map either to zoom or move the location the flyto functionality no longer works
DISCOVERIES:  The console log runs when the map is updated via the drop down or imput..

	const handleViewPort = (nextViewport) => {
		console.log('handleViewPort', nextViewport);
		setViewport(nextViewport)
	};

.but if the map is manually moved there are no console logs

RESOLUTION: added the following to setViewport in the useEffect
			transitionInterpolator,
      transitionDuration: 2000,
*/