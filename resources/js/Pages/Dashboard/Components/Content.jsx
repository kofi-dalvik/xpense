import { Header, Summary, Categories } from '@/Pages/Dashboard/Components';

export default function Content({
    auth,
    categories,
    dateRange,
    setDateRange,
    summary,
    budget,
    refreshDashboard
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
                    refreshDashboard={refreshDashboard} />

                <div className="my-14"></div>

                <Categories categories={categories} />
            </div>
        </div>
    );
}