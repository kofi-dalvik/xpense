import { TextButton, SectionTitle } from '@/Pages/Dashboard/Components';

export default function Categories({ categories }) {
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

            <div className="categories pb-4 my-8 grid grid-cols-6 gap-4">
                { categories.map((category, index) => {
                    return (
                        <div className="category text-center rounded bg-white shadow p-3 me-2" key={index}>
                            <div className="icon">
                                <i className={`mdi ${category.ui.icon} ${category.ui.color} text-5xl p-2`}></i>
                            </div>
                            <div className="text-muted text-sm truncate">{category.name}</div>
                            <div className="text-base font-semibold">${category.total.toLocaleString()}</div>
                            <TextButton icon="mdi-settings" text="Configure"/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}