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
    categoryDetail
}) {
    return (
        <div className="x-dashboard-c">
            <Header />

            <div className='p-5'>
                <Summary
                    dateRange={ dateRange }
                    setDateRange={ setDateRange }
                    summary={ summary }
                    budget={ budget }
                    refreshDashboard={refreshDashboard}
                    currency={currency} />

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