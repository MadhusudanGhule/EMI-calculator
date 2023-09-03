import React from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import the Chart components
import { Doughnut } from 'react-chartjs-2';

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

function PieChart({piData}) {
  console.log(piData)
  const data = {
    labels: ['Principal Amount', 'Down payment', 'Processing fee'],
    datasets: [
      {
        label: '# of Votes',
        data: [piData.totalamt, piData.downPayment, piData.fee],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
         
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
          
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}

export default PieChart;
