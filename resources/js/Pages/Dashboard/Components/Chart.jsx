import { createChart } from '@/libs/chart';
import { useEffect, useRef } from 'react';

export default function Chart({ currency, categories }) {
    const ref = useRef(null);

    let chart = null;

    const values = [];
    const labels = [];
    const dataLabels = [];

    for (const category of categories) {
        values.push(category.total);
        labels.push(category.name);
        dataLabels.push(currency + '' + category.total.toLocaleString());
    }

    const options = {
        onClick: (params) => {
            console.log(params);
        },
    };

    useEffect(() => {
        const data = { labels, values, dataLabels };

        chart = createChart(ref.current, data, options);

        return () => {
            chart.destroy();
        }
    }, [categories]);

    return (
        <div className='chart-container flex justify-center h-72'>
            <canvas ref={ref}></canvas>
        </div>
    );
}