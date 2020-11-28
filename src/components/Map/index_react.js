import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import useDataApi from '../../hooks/useDataApi';
import Circles from './Circles';
import { boroughLegend } from '../../services/legend';
import './styles.css';
const url =
  'https://raw.githubusercontent.com/jkeohan/D3-Tutorials/3f3e4fb52aea827455fd4cc7c4893eb37f58e411/nyc.counties.json';

const Map = (props) => {
  console.log('Map - props', props)
  let [{ data }] = useDataApi(url, []);
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator()
    .center([-73.93, 40.72]).scale(57500));

  useEffect(() => {
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;
    projRef.current.translate([width / 2, height / 2]);
  }, [data]);

  // useEffect(() => {
  //   renderParks(props.activeParks);
  // }, [props.activeParks]);

  const renderChart = () => {
    const path = d3.geoPath().projection(projRef.current);
    return data[0].features.map((d, i) => {
      const featurePath = path(d)
      return (
        <path
          key={i}
          d={featurePath}
          className={d.properties.name}
          fill={boroughLegend(d.properties.borough)}
        />
      );
    });
  };

  const renderParks = (parks) => {
    const circles = d3
      .select(svgRef.current)
      .selectAll('.parks')
      .data(parks, (d) => d.name);

    circles
      .enter()
      .append('circle')
      .attr( 'transform',(d) => `translate(${projRef.current([+d.lon, +d.lat])})`)
      .attr('r', 4)
      .attr('class', (d, i) => `parks park-${d.code}`)
      .style('fill', (d) => d.color)
      .style('opacity', 0)
    .transition().duration(500)
      .style('opacity', 1);

    circles.exit().transition().duration(500).style('opacity', 0).remove();
  };

  return (
    <svg id="boroughs-map" ref={svgRef}>
      {data.length && renderChart()}
      {props.activeParks && 
        <Circles {...props} projection={projRef.current} /> 
      }
    </svg>
  );
};

export default Map;
