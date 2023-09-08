import { get, first, fill, shuffle } from 'lodash';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { COLOR_VALUES } from '@/constants';

Chart.register(ChartDataLabels);

const DEFAULT_COLOR = `#F2F2F2`;

export const createChart = (canvas, data, options) => {
    const dataLebels = get(data, 'dataLabels', []);
    let colors = data.colors;

    // if (!colors || colors.length === 0) {
    //     colors = shuffle(COLOR_VALUES).slice(0, dataLebels.length);
    // }

    const offset = get(data, 'offset', fill(Array(dataLebels.length), 0));

    const chart = new Chart(canvas.getContext('2d'), {
        type: data.type || 'bar',
        data: {
            labels: get(data, 'labels', []),
            datasets: [{
                offset: offset,
                backgroundColor: colors,
                data: get(data, 'values', []),
            }]
        },
        options: {
            ...options,
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    color: 'white',
                    font: {
                        size: '11px'
                    },
                    formatter: function(value, context) {
                        return dataLebels[context.dataIndex] || '';
                    }
                }
            },
            onClick: (e) => {
                const onClick = get(options, 'onClick', null);
                const item = first(chart.getActiveElements(e));
                if (item && onClick) {
                    onClick(item);
                }
            },
        }
    });

    chart.draw();

    return chart;
}


export default Chart;