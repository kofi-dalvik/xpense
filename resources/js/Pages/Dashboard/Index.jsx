import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Content, Transactions } from '@/Pages/Dashboard/Components';
import { CURRENCY_SYMBOLS } from '@/constants';
import { first } from 'lodash';
import { StoreProvider } from './Store';

export default function Dashboard({ auth, cats, trans, smry, bdgt }) {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(cats);
    const [transactions, setTransactions] = useState(trans);
    const [summary, setSummary] = useState(smry);
    const [budget, setBudget] = useState(bdgt);
    const [categoryDetail, setCategoryDetail] = useState(null);
    const [chartType, setChartType] = useState('pie');

    const [chartData, setChartData] = useState({
        type: chartType,
        categories: [],
        values: [],
        labels: [],
        dataLabels: []
    });

    const currency = CURRENCY_SYMBOLS[auth.user.currency];

    const [dateRange, setDateRange] = useState({
        from: moment().startOf('month').format('YYYY-MM-DD'),
        to: moment().endOf('month').format('YYYY-MM-DD')
    });

    const setData = (data) => {
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
            setCategoryDetail(response.data);
        });
    };

    const refreshDashboard = () => {
        fetchData();
    };

    const parseChartData = (cats, parent) => {
        const data = { categories: [], values: [], labels: [], dataLabels: [] };

        for (let cat of cats) {
            data.values.push(cat.total);
            data.labels.push(cat.name);
            data.dataLabels.push(currency + '' + cat.total.toLocaleString());
            data.categories.push(cat);
        }

        if (parent) {
            data.parent = parent.name;
            data.values.push(parent.total);
            data.labels.push(`Others`);
            data.dataLabels.push(currency + '' + parent.total.toLocaleString());
        }

        setChartData({...data, currency, type: chartType });
    };

    const onChartClick = (category) => {
        if (category === -1) {
            parseChartData(categories);
            return;
        }

        if (category) {
            axios.get(route('categories.subcats', {...dateRange, id: category.id})).then((response) => {
                if (response.data.length) {
                    parseChartData(response.data, category);
                }
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [dateRange]);

    useEffect(() => {
        parseChartData(categories);
    }, [categories]);

    const store = {
        categories,
        transactions,
        summary,
        budget,
        dateRange,
        setDateRange,
        refreshDashboard,
        fetchCategory,
        categoryDetail,
        currency,
        chartData,
        onChartClick
    };

    return (
        <StoreProvider value={ store }>
            <AuthenticatedLayout hideAll={true}>
                <Head title="Dashboard" />

                <div className="x-dashboard relative min-h-screen md:px-20 pt-24 md:pt-16">
                    <Content
                        auth={auth}
                        categories={categories}
                        setDateRange={ setDateRange }
                        dateRange={ dateRange }
                        summary={ summary }
                        budget={ budget }
                        refreshDashboard={refreshDashboard}
                        fetchCategory={fetchCategory}
                        categoryDetail={categoryDetail}
                        currency={currency}
                        chartData={chartData}
                        onChartClick={onChartClick} />

                    <Transactions
                        auth={auth}
                        transactions={transactions}
                        currency={currency}
                        refreshDashboard={refreshDashboard}
                        categories={categories} />
                </div>
            </AuthenticatedLayout>
        </StoreProvider>
    );
}
