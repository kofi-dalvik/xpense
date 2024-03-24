import { useState } from "react";
import SectionTitle from "@/Pages/Dashboard/Components/SectionTitle";
import AddCategory from "@/Pages/Dashboard/Components/Categories/AddCategory";
import CategoryItem from "@/Pages/Dashboard/Components/Categories/CategoryItem";
import ViewCategory from "@/Pages/Dashboard/Components/Categories/ViewCategory";


export default function Categories({ currency, dateRange, categories, refreshDashboard, fetchCategory, categoryDetail }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const [showViewCategory, setShowViewCategory] = useState(false);
    const [selectedViewCategory, setSelectedViewCategory] = useState(null);

    const onDetailsClick = (category) => {
        setSelectedViewCategory(category);

        if (category) {
            fetchCategory(category.id);
        }

        setShowViewCategory(true);
    };

    const secTitle = `Category Summaries from ${moment(dateRange.from).format('MMM DD')} to ${moment(dateRange.to).format('MMM DD')}`;

    return (
        <div className="mt-5">
            <SectionTitle
                icon="mdi-google-circles-extended"
                title={secTitle}
                subtitle="Manage your categories">
                    <div className="md:text-end">
                        <button onClick={() => setShowAddCategory(true) } className='btn bg-white shadow text-sm'>
                            <i className='mdi mdi-plus me-2'></i>
                            Add Category
                        </button>
                    </div>
            </SectionTitle>

            <div className="categories pb-4 my-8 grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
                { categories.map((category, index) => {
                    return <CategoryItem
                            key={index}
                            currency={currency}
                            category={category}
                            onDetailsClick={ (e) => onDetailsClick(category) }
                        />
                })}
            </div>

            <AddCategory
                show={ showAddCategory }
                setShow={ setShowAddCategory }
                category={ selectedCategory }
                onClose={ setSelectedCategory }
                parents={ categories }
                refreshDashboard={ refreshDashboard }
            />

            <ViewCategory
                show={showViewCategory}
                setShow={setShowViewCategory}
                category={selectedViewCategory}
                refreshDashboard={refreshDashboard}
                categoryDetail={categoryDetail}
                dateRange={dateRange}
                currency={currency}
            />
        </div>
    );
}