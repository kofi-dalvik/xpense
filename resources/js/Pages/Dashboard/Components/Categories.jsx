import { TextButton, SectionTitle } from '@/Pages/Dashboard/Components';

export default function Categories() {
    const categories = [
        { name: 'Food', icon: 'mdi-food', color: 'text-primary' },
        { name: 'Transportation', icon: 'mdi-car', color: 'text-secondary' },
        { name: 'Shopping', icon: 'mdi-shopping', color: 'text-success' },
        { name: 'Entertainment', icon: 'mdi-gamepad-variant', color: 'text-warning' },
        { name: 'Health', icon: 'mdi-heart-pulse', color: 'text-danger' },
        { name: 'Education', icon: 'mdi-school', color: 'text-info' },
        { name: 'Investment', icon: 'mdi-bank', color: 'text-dark' },
    ];

    return (
        <div className="mt-5">
            <SectionTitle
                icon="mdi-google-circles-extended"
                title="Categories"
                subtitle="Manage your categories">
                    <div className="text-end">
                        <button className='btn bg-white shadow text-sm'>
                            <i className='mdi mdi-plus me-2'></i>
                            Add Category
                        </button>
                    </div>
            </SectionTitle>

            <div className="categories pb-4 my-8 grid grid-cols-8 gap-4">
                { categories.map((category, index) => {
                    return (
                        <div className="category text-center rounded bg-white shadow p-3 me-2" key={index}>
                            <div className="icon">
                                <i className={`mdi ${category.icon} ${category.color} text-5xl p-2`}></i>
                            </div>
                            <div className="text-muted text-sm truncate">{category.name}</div>
                            <div className="text-base font-bold">$23.42</div>
                            <TextButton icon="mdi-settings" text="Configure"/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}