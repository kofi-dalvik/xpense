import { createChart } from '@/libs/chart';
import { get } from 'lodash';
import { useEffect, useRef } from 'react';

export default function Chart({ chartData, onChartClick }) {
    const ref = useRef(null);

    useEffect(() => {
        const options = {
            onClick: (params) => {
                if (onChartClick) {
                    const category = get(chartData.categories, params.index);

                    if (category && category.children && category.children.length > 0) {
                        onChartClick(category);
                    }
                }
            }
        };

        if (chartData.type !== 'pie') {
            options.scales = {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return get(chartData, 'currency', '$') + value;
                        }
                    }
                }
            };
        }

        const chart = createChart(ref.current, chartData, options);

        return () => {
            chart.destroy();
        }
    }, [ chartData ]);

    return (
        <>
            { chartData.parent && (
                <div className='mb-2'>
                    <button className="text-primary underline" type='button' onClick={ e => onChartClick(-1) }>Main Categories</button>
                    <span className="ms-1 me-1">/</span>
                    <button className="text-muted" type='button'>{ chartData.parent }</button>
                </div>
            ) }

            <div className='chart-container flex justify-center h-56 md:h-72'>
                <canvas ref={ref}></canvas>
            </div>
        </>
    );
}