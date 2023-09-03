import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Content, Transactions } from '@/Pages/Dashboard/Components';

export default function Dashboard({ auth, cats, trans, smry, bdgt }) {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(cats);
    const [transactions, setTransactions] = useState(trans);
    const [summary, setSummary] = useState(smry);
    const [budget, setBudget] = useState(bdgt);
    const [categoryDetail, setCategoryDetail] = useState(null);

    const [dateRange, setDateRange] = useState({
        from: moment().startOf('month').format('YYYY-MM-DD'),
        to: moment().endOf('month').format('YYYY-MM-DD')
    });

    const setData = (data) => {
        console.log(data);
        setCategories(curr => data.cats);
        setTransactions(curr => data.trans)
        setSummary(curr => data.smry);
        setBudget(curr => data.bdgt);
    };

    const fetchData = () => {
        axios.get(route('dashboard.data', dateRange)).then((response) => {
            setData(response.data);
        });
    }

    const fetchCategory = (id) => {
        const params = {...dateRange, id};
        axios.get(route('categories.show', params)).then((response) => {
            console.log(response.data);
            setCategoryDetail(response.data);
        });
    };

    const refreshDashboard = () => {
        console.log('refreshing dashboard...');
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [dateRange]);

    return (
        <AuthenticatedLayout hideAll={true}>
            <Head title="Dashboard" />

            <div className="x-dashboard px-20">
                <Content
                    auth={auth}
                    categories={categories}
                    setDateRange={ setDateRange }
                    dateRange={ dateRange }
                    summary={ summary }
                    budget={ budget }
                    refreshDashboard={refreshDashboard}
                    fetchCategory={fetchCategory}
                    categoryDetail={categoryDetail} />

                <Transactions
                    auth={auth}
                    transactions={transactions} />
            </div>
        </AuthenticatedLayout>
    );
}
