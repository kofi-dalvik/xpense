import Header from '@/Pages/Dashboard/Components/Header';
import Summary from '@/Pages/Dashboard/Components/Summary';
import Categories from '@/Pages/Dashboard/Components/Categories/Categories';


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
        <div className="x-dashboard-c md:w-3/4">
            <Header />

            <div className='p-4 md:p-5'>
                <Summary
                    dateRange={ dateRange }
                    setDateRange={ setDateRange }
                    summary={ summary }
                    categories={categories}
                    budget={ budget }
                    refreshDashboard={refreshDashboard}
                    currency={currency}
                    chartData={chartData}
                    onChartClick={onChartClick}
                    auth={auth}
                    />

                <div className="my-14"></div>

                <Categories
                    categories={categories}
                    dateRange={ dateRange }
                    refreshDashboard={refreshDashboard}
                    categoryDetail={categoryDetail}
                    fetchCategory={fetchCategory}
                    currency={currency}
                    auth={auth} />
            </div>
        </div>
    );
}