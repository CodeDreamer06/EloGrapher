import { useEffect } from 'react'
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const RatingGraph = ({ ratings, timestamps }) => {
    useEffect(() => {
        Chart.register(ChartDataLabels);

        const context = document.getElementById("line-plot").getContext("2d");
        var gradient = context.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(94, 190, 255, 1)');   
        gradient.addColorStop(1, 'rgba(94, 190, 255, 0)');

        var lineGraph = new Chart("line-plot", {
            type: "line",
            data: {
                labels: timestamps,
                datasets: [
                    {
                        label: "Rating",
                        data: ratings,
                        borderColor: "#6FC5FF",
                        backgroundColor: gradient,
                        fill: true,
                        borderWidth: 5,
                        lineTension: 0.3,
                        pointRadius: 3,
                        pointBackgroundColor: "#6FC5FF",
                        pointHoverRadius: 5,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Rating trend"
                },
                scales: {
                    x: {
                        ticks: {
                            callback: (value, _) =>  new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }).format(timestamps[value])
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        return () => {
            lineGraph.destroy();
        }
    }, [ratings, timestamps]);
    
    return <div className="line-graph">
        <canvas id="line-plot"/>
    </div>;
}
 
export default RatingGraph;