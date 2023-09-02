import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Content, Transactions } from '@/Pages/Dashboard/Components';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout hideAll={true}>
            <Head title="Dashboard" />

            <div className="x-dashboard px-20">
                <Content />
                <Transactions auth={auth}/>
            </div>
        </AuthenticatedLayout>
    );
}
