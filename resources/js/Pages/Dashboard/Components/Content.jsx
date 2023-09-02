import { Header, Summary, Categories } from '@/Pages/Dashboard/Components';

export default function Content({ auth, categories }) {
    return (
        <div className="x-dashboard-c">
            <Header />

            <div className='p-5'>
                <Summary/>
                <div className="my-14"></div>
                <Categories categories={categories} />
            </div>
        </div>
    );
}