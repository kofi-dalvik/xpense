import { TextButton, SectionTitle, DateRangePicker, Chart, Budget } from "@/Pages/Dashboard/Components";
import { EVENT_ADD_TRNX } from "@/constants";
import { publish } from "@/libs/events";

export default function Summary({
    currency,
    categories,
    dateRange,
    setDateRange,
    summary,
    budget,
    refreshDashboard,
    chartData,
    onChartClick,
}) {
    const figures = [
        { name: 'Income', amount: summary.income, color: 'text-success', icon: 'mdi-chevron-double-up' },
        { name: 'Expense', amount: summary.expense, color: 'text-danger', icon: 'mdi-chevron-double-down' },
        { name: 'Balance', amount: summary.balance, color: 'text-primary', icon: 'mdi-autorenew', hideMore: true },
    ];

    const secTitle = `Analytics from ${moment(dateRange.from).format('MMM DD')} to ${moment(dateRange.to).format('MMM DD')}`;

    const addTransaction = (type) => {
        publish(EVENT_ADD_TRNX, { type });
    };

    return (
        <>
            <SectionTitle
                icon="mdi-chart-areaspline"
                title={ secTitle }
                subtitle="View summary of your transactions">
                    <div className="bg-purple-100 p-3 rounded">
                        <DateRangePicker value={ dateRange } onChange={ setDateRange } />
                    </div>
            </SectionTitle>

            <div className='summary shadow bg-white rounded p-4 mt-5'>
                <div className="grid grid-cols-12">
                    <div className="col-span-8 pr-5">
                        <div className="grid grid-cols-12">
                            { figures.map((figure, index) => {
                                return (
                                    <div key={index} className={`col-span-4 figure ${figure.color} rounded`}>
                                        <div className="icon w-8 h-8 flex justify-center items-center rounded-full">
                                            <i className={`mdi ${figure.icon} text-xl`}></i>
                                        </div>
                                        <div className="amount">
                                            <span className="text-sm">{currency}</span> {figure.amount.toLocaleString()}
                                        </div>
                                        <div className="text-muted flex items-center text-sm">
                                            <span className="me-2">{figure.name}</span>
                                            { !figure.hideMore && (
                                                <TextButton
                                                    text="Add"
                                                    onClick={ e => addTransaction(figure.name.toLowerCase()) }
                                                    title={`Configure ${figure.name}`}
                                                    />
                                            ) }
                                        </div>
                                    </div>
                                );
                            }) }
                        </div>

                        <div className="mt-3 p-5">
                            <Chart
                                currency={currency}
                                chartData={chartData}
                                onChartClick={onChartClick} />
                        </div>
                    </div>

                    <div className="col-span-4">
                        <Budget
                            budget={budget}
                            currency={currency}
                            dateRange={dateRange}
                            refreshDashboard={refreshDashboard}/>
                    </div>
                </div>
            </div>
        </>
    );
}