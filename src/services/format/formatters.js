import {circleLegend} from '../legend'

const formatData = (data) => {

  const boroughs = data.reduce( (acc,d) => {
    if(!acc.includes(d.gsx$borough.$t)) {
      acc.push(d.gsx$borough.$t)
    }
    return acc
  },[])
  
  const boroughColors = {
    'Brooklyn': "#306A9C",
    'Manhattan': "#6DB099",
    Bronx: "#F78154",
    Queens: "#EAC435",
    "Staten Island": "#CD7998"
  };

  return data.map((d) => {
    // console.log('formatGoogleData - d', d, d.gsx$overallcourtgrouping)
    return {
      code: d.gsx$ntacode.$t,
      name: d.gsx$name.$t,
      borough: d.gsx$borough.$t,
      boroughColor: boroughColors[d.gsx$borough.$t],
      overall: d.gsx$overall.$t,
      url: d.gsx$url.$t,
      lon: d.gsx$lon.$t,
      lat: d.gsx$lat.$t,
      rating: d.gsx$overallcourtgrouping.$t,
      color: circleLegend(d.gsx$overallcourtgrouping.$t),
      active: false
    };
  }).sort( (a,b) => {
    // console.log('App - formattedData', a.name)
    return a.name > b.name ? 1 : -1
  })
};

export { formatData }