import { Header, Summary, Categories } from '@/Pages/Dashboard/Components';

export default function Content({
    auth,
    currency,
    categories,
    dateRange,
    setDateRange,
    summary,
    budget,
    refreshDashboard,
    fetchCategory,
    categoryDetail,
    chartData,
    onChartClick,
}) {
    return (
        <div className="x-dashboard-c w-3/4">
            <Header />

            <div className='p-5'>
                <Summary
                    dateRange={ dateRange }
                    setDateRange={ setDateRange }
                    summary={ summary }
                    categories={categories}
                    budget={ budget }
                    refreshDashboard={refreshDashboard}
                    currency={currency}
                    chartData={chartData}
                    onChartClick={onChartClick} />

                <div className="my-14"></div>

                <Categories
                    categories={categories}
                    dateRange={ dateRange }
                    refreshDashboard={refreshDashboard}
                    categoryDetail={categoryDetail}
                    fetchCategory={fetchCategory}
                    currency={currency} />
            </div>
        </div>
    );
}