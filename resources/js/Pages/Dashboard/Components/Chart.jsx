import Dropdown from '@/Components/Dropdown';
import { createChart } from '@/libs/chart';
import { get } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../Store';

export default function Chart({ auth, onChartClick }) {
    const ref = useRef(null);

    const {chartData, setChartType} = useStore();
    // console.log(chartData);

    const chartTypes = ['bar', 'line', 'pie'];

    const chartIcons = {
        'bar': 'mdi-chart-bar',
        'line': 'mdi-chart-line',
        'pie': 'mdi-chart-pie',
    };

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
            <div className="flex justify-between mb-2">
                <div>
                    <div>
                        <button
                            className={(chartData.parent ? 'underline text-primary' : 'text-muted')}
                            type='button'
                            onClick={ e => onChartClick(-1) }>Main Categories</button>
                        { chartData.parent && (
                            <>
                                <span className="ms-1 me-1">/</span>
                                <button className="text-muted" type='button'>{ chartData.parent }</button>
                            </>
                        ) }
                    </div>
                </div>

                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-0 border border-transparent text-sm leading-4 font-medium text-purple-500 bg-purple-100 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 res-text-sm capitalize"
                                >
                                    <i className={"mdi me-2 " + chartIcons[chartData.type]}></i> { chartData.type }
                                    <i className="mdi mdi-chevron-down ms-2 text-xl"></i>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            { chartTypes.map((type) => {
                                return (
                                    <Dropdown.Link href="#" key={type} onClick={ e => setChartType(type) }>
                                        <i className={"mdi me-1 " + chartIcons[type]}></i>
                                        <span className="capitalize">{type}</span>
                                    </Dropdown.Link>
                                );
                            }) }
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            <div className='chart-container flex justify-center h-56 md:h-72'>
                <canvas ref={ref}></canvas>
            </div>
        </>
    );
}