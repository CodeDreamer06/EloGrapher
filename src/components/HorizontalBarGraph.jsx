import { useEffect } from 'react'
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const HorizontalBarGraph = ({ data, labels, handleOnClick }) => {
    useEffect(() => {
      Chart.register(ChartDataLabels);
      var barGraph = new Chart("barGraph", {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [
                {
                  data,
                  backgroundColor: ['#FF6767', '#67A4FF', '#FFB967'],
                  borderRadius: '15',
                  borderSkipped: 'none'
                },
              ]
          },
          options: {
            onClick: (e, element) => {
              if (element.length > 0) handleOnClick(element[0].index)
            },
            indexAxis: 'y',
            elements: {
              bar: { borderWidth: 1 }
            },
            scales: { 
              x: {
                grid: { color: '#3F3F3F' },
                ticks: { font: { size: 18 }, family: 'Poppins' },
              },
              y: {
                ticks: {
                  font: { size: 20, family: 'Poppins' },
                  color: 'white',
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
              legend: { display: false },
              datalabels: {
                color: 'white',
                anchor: 'end',
                clamp: true,
                align: 'start',
                offset: 10,
                font: {
                  size: 20,
                  weight: 'bold',
                  family: 'Poppins'
                }
              },
              // afterDraw: chart => {
              //   var context = chart.chart.ctx;
              //   var xAxis = chart.scales['x-axis-0'];
              //   var yAxis = chart.scales['y-axis-0'];
              //   xAxis.ticks.forEach((value, i) => {
              //     console.log(value)
              //     var x = xAxis.getPixelForTick(i);
              //     var image = new Image();
              //     image.src = labelImages[i];
              //     context.drawImage(image, x - 12, yAxis.bottom + 10)
              //   });
              // }
            }
          },
      })
        return () => {
            barGraph.destroy();
        }
    }, [data, labels]);

    return <div className="horizontal-graph">
        <canvas id="barGraph"/>
    </div>;
}
 
export default HorizontalBarGraph;