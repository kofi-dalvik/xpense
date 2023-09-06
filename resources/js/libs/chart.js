import { get, first, fill, shuffle } from 'lodash';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LIGHT_COLORS } from '@/constants';

Chart.register(ChartDataLabels);

const DEFAULT_COLOR = `#F2F2F2`;

export const createChart = (canvas, data, options) => {
    const dataLebels = get(data, 'dataLabels', []);
    let colors = shuffle(LIGHT_COLORS).slice(0, dataLebels.length);
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
                    color: 'black',
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

export const setActivePieChartSlice = (chart, index) => {
    let colors = [];
    const dataSize = chart.data.labels.length;

    if (index > -1) {
        colors = fill(Array(dataSize), DEFAULT_COLOR);
        colors[index] = LIGHT_COLORS[index];
    } else {
        colors = LIGHT_COLORS.slice(0, dataSize);
    }

    chart.data.datasets[0].backgroundColor = colors;
    chart.data.datasets[0].offset = chart.data.datasets[0].offset.map(() => 0);
    chart.data.datasets[0].offset[index] = 20;
    chart.update();
};

export default Chart;