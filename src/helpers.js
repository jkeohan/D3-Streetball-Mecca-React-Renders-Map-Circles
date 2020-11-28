import * as d3 from 'd3'

export const filterTopParks = (data) => {
  // console.log('filterTopPParks - topParks', data)
  return data.sort( (a,b) => 
    d3.descending(+a.overall, +b.overall)).slice(0, 10)
}
