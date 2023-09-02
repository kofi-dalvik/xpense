import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Content, Transactions } from '@/Pages/Dashboard/Components';

export default function Dashboard({ auth, cats, trans }) {
    const [categories, setCategories] = useState(cats);
    const [transactions, setTransactions] = useState(trans);

    const common = {
        auth,
        categories,
        transactions,
    };

    return (
        <AuthenticatedLayout hideAll={true}>
            <Head title="Dashboard" />

            <div className="x-dashboard px-20">
                <Content {...common} />

                <Transactions {...common} />
            </div>
        </AuthenticatedLayout>
    );
}
