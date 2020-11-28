import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import useDataApi from '../../hooks/useDataApi';
import { formatData } from '../../services/format/formatters';
// COMPONENTS
// import Map from '../Map/index_d3'
import Map from '../Map/index_react';
import DropDown from '../DropDown'
import Input from '../Input'

export default function App() {
  const mapRef = useRef();
  const [parkData, setParkData] = useState({
    allParks: [],
    activeParks: [],
    activeBorough: 'all'
  });

  const [{ data, isLoading }] = useDataApi(
    'https://spreadsheets.google.com/feeds/list/1EJ5k2hkdldEz7yrvWSvkCs3Hm6aCU4Po4zBH6nVYvhU/od6/public/values?alt=json',
    []
  );

  useEffect(() => {
    if (data.length) {
      const formattedData = formatData(data[0].feed.entry)
      setParkData( prevState => ({
        ...prevState,
        allParks: formattedData,
        activeParks: formattedData,
      }));
    }
  }, [data]);

  const filterParksByPark = park => {
    setParkData({
      ...parkData,
      activeParks: [park],
      activeBorough: park.borough
    });
  }

  const filterParksByBorough = borough => {
      const parksByBorough = parkData.allParks.filter( park => {
        return borough   === 'all' ? park : park.borough === borough 
      });
      setParkData({
        ...parkData,
        activeParks: parksByBorough,
        activeBorough: borough
      });
  };
  
  return (
    <div className="App">
      <main>
        <div id="map" ref={mapRef}>
          <Map {...parkData} />
          <div id="filters">
            <div id='court'>
             <Input 
              allParks={parkData.allParks} 
              activeParks={parkData.activeParks}
              filterParksByPark={filterParksByPark}
              />
            </div>
            <div id="borough">
              <DropDown 
                filterParksByBorough={filterParksByBorough}
                activeBorough={parkData.activeBorough}
                />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
