import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useDataApi from '../../hooks/useDataApi';
import { boroughLegend } from '../../services/legend';
import './styles.css';
const url =
  'https://raw.githubusercontent.com/jkeohan/D3-Tutorials/3f3e4fb52aea827455fd4cc7c4893eb37f58e411/nyc.counties.json';

const Map = (props) => {
  const [{ data }] = useDataApi(url, []);
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator().center([-73.93, 40.72]).scale(57500));

  useEffect(() => {
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;
    projRef.current.translate([width / 2, height / 2]);
    data.length && renderChart(data[0].features);
  }, [data]);

  useEffect(() => {
    renderParks(props.activeParks);
  }, [props.activeParks]);

  const renderChart = (data) => {
    const path = d3.geoPath().projection(projRef.current);
    d3.select(svgRef.current)
      .selectAll('path')
      .data(data)
      .enter()
      .append('path')
      .attr('class', (d) => d.properties.name)
      .attr('d', path)
      .style('fill', (d) => boroughLegend(d.properties.borough));
  };

  const renderParks = (parks) => {
    d3.select(svgRef.current).selectAll('.parks')
    .data(parks, (d) => d.name)
    .join(
      enter => (
         enter.append('circle')
          .attr('transform',(d) => `translate(${projRef.current([+d.lon, +d.lat])})`)
          .attr('r', 4)
          .attr('class', (d, i) => `parks park-${d.code}`)
          .style('fill', (d) => d.color)
          .style('opacity', 0)
            .call(enter => (enter.transition().duration(1000).style('opacity', 1)))
            ),
      update => ( 
        update.style('opacity', 1)),
      exit => (
        exit.call(exit => (
            exit.transition().duration(1000).style('opacity', 0).remove()
          ))
       ),
    )
  };
  
  return <svg id="boroughs-map" ref={svgRef}></svg>;
};

export default Map;

const renderParks = (parks) => {
  d3.select(svgRef.current).selectAll('.parks')
  .data(parks, (d) => d.name)
  .join(
    enter => ( enter.append('circle')
    .attr('transform',(d) => `translate(${projRef.current([+d.lon, +d.lat])})`)
    .attr('r', 4)
    .attr('class', (d, i) => `parks park-${d.code}`)
    .style('fill', (d) => d.color)
    .style('opacity', 0)
    .call(enter => (enter.transition().duration(1000).style('opacity', 1)))
    ),
    update => ( update.style('opacity', 1)),
    exit => (
      exit.call(exit => (
          exit.transition().duration(1000).style('opacity', 0).remove()
        ))
     ),
  )
};
