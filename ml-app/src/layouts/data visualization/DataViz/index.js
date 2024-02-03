import React from 'react'
import DataUploader from './data_handling';
import { BarChart } from 'reaviz';


// Example chart generation component using Chart.js
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


// const data = [
//     { key: 'IDS', data: 14 },
//     { key: 'Malware', data: 5 },
//     { key: 'DLP', data: 18 }
// ];
export const DataViz = ({ data }) => {
const chartRef = useRef(null);
      
    useEffect(() => {
    if (data) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item) => item.label),
        datasets: [{
          label: 'Chart Data',
          data: data.map((item) => item.value),
        }],
      },
    });
  }
}, [data]);


  return (
      <canvas ref={chartRef} />
 
    

  )
};

export default DataViz;
 {/* <BarChart width={350} height={250} data={data} /> */}