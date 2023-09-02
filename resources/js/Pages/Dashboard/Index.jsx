import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Content, Transactions } from '@/Pages/Dashboard/Components';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="x-dashboard">
                <Content />
                <Transactions />
            </div>
        </AuthenticatedLayout>
    );
}
