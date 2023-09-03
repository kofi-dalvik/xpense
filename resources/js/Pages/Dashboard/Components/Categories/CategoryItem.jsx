import { TextButton } from "@/Pages/Dashboard/Components";

const CategoryItem = ({ category, slim = false, parent_id, onDetailsClick = () => {}, onSelected = () => {} }) => {
    return (
        <div
            onClick={ () => onSelected(category) }
            className={
                `category text-center rounded ${slim ? 'border cursor-pointer' : 'bg-white'} shadow p-2 me-2` +
                ` ${parent_id === category.id ? 'bg-purple-200' : ''}`
            }>
            <div className="icon">
                <i className={`mdi ${category.ui.icon} text-${category.ui.color} ${slim ? 'text-3xl' : 'text-5xl p-2' }`}></i>
            </div>
            <div className={
                `text-muted ${slim ? 'text-xs' : 'text-sm'} truncate `
            }>{category.name}</div>
            { !slim && <>
                <div className="text-base font-semibold">${category.total.toLocaleString()}</div>
                <TextButton icon="mdi-settings" text="Details" onClick={ onDetailsClick }/>
            </>}
        </div>
    );
};

export default CategoryItem;