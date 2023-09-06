import { TextButton } from "@/Pages/Dashboard/Components";

const CategoryItem = ({ currency, category, slim = false, parent_id, onDetailsClick = () => {}, onSelected = () => {} }) => {
    return (
        <div
            onClick={ () => onSelected(category) }
            className={
                `category text-center rounded ${slim ? 'border cursor-pointer' : 'bg-white'} shadow p-1 sm:p-2 sm:me-2` +
                ` ${parent_id === category.id ? 'bg-purple-200' : ''}`
            }>
            <div className="icon">
                <i className={`mdi ${category.ui.icon} text-${category.ui.color} ${slim ? 'text-xl sm:text-3xl' : 'text-3xl sm:text-5xl sm:p-2' }`}></i>
            </div>
            <div className={
                `text-muted mb-1 sm:mb-0 ${slim ? 'text-xs' : 'res-text-sm'} truncate `
            }>{category.name}</div>
            { !slim && <>
                <div className="res-text-xl font-semibold">{currency} {category.total.toLocaleString()}</div>
                <TextButton icon="mdi-settings" text="Details" onClick={ onDetailsClick }/>
            </>}
        </div>
    );
};

export default CategoryItem;